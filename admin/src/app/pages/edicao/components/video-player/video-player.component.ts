import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import videojs from 'video.js';

import { VideoPaginate } from 'src/app/shared/models/video';
import { UtilService } from 'src/app/shared/services/util.service';
import { VideoService } from '../../services/video.service';
import { ChannelEnum } from 'src/app/shared/models/channel';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VideoPlayerComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('video', { static: true }) video: ElementRef;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;

  @Output('thumbnail')
  public thumbnail: EventEmitter<string> = new EventEmitter();

  @Output()
  public videoDuration: EventEmitter<number> = new EventEmitter();

  @Output()
  public startCutTime: EventEmitter<number> = new EventEmitter();

  @Output()
  public endCutTime: EventEmitter<number> = new EventEmitter();

  @Output()
  public videoId: EventEmitter<number> = new EventEmitter();

  @Output()
  public offsetTime: EventEmitter<number> = new EventEmitter();

  @Output()
  public changeTime: EventEmitter<Array<number>> = new EventEmitter();

  @Input() set currentTimeVideo(value: Array<number>) {
    this.handleTimelineChanges(value);
  }

  @Input() set videoPreview(value: {
    start: number;
    finish: number;
    idVideo: number;
  }) {
    this.handleVideoPreview(value);
  }

  _aspectRatioValue: string;

  @Input() set aspectRatioValue(value: string) {
    this.aspectRatio = value;
    switch (value) {
      case '16:9':
        this._aspectRatioValue = '885px';
        break;
      case '1:1':
        this._aspectRatioValue = '500px';
        break;
      case '9:16':
        this._aspectRatioValue = '282px';
        break;
      case '4:5':
        this._aspectRatioValue = '400px';
        break;
      default:
        this._aspectRatioValue = '885px';
        break;
    }
  }

  get aspectRatioValue(): string {
    return this._aspectRatioValue;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    event.preventDefault();
    this.listenArrowKeys(event);
    this.listenSpaceKey(event);
    this.handlePlaybackrateKeydown(event);
    this.handleNextPreviousVideo(event);
    this.handleStartEndCut(event);
  }

  @HostListener('mouseover', ['$event'])
  onMouseOver(event: MouseEvent) {
    this.isMouseOverVideo = true;
  }

  @HostListener('mouseout', ['$event'])
  onMouseOut(event: MouseEvent) {
    this.isMouseOverVideo = false;
  }

  public player: videojs.Player;
  public options = {
    autoplay: false,
    controls: false,
    sources: [],
    preload: 'metadata',
    liveui: true,
  };
  public aspectRatio: string = '16:9';
  public currentTimeDisplay: string = '00:00:00';
  public actualFrame: number = 0;
  public canvasContext: CanvasRenderingContext2D;
  public image: string = '';
  public isLoading: boolean = true;

  public channelId: number;
  public channelType: number;
  public idNextVideo: number;
  public idPrevVideo: number;

  public videoSpeed: number = 1;
  public timelineSelections: Array<number> = [0, 600];

  public isMouseOverVideo: boolean = false;

  public subscriptions: Subscription = new Subscription();
  public offSetTimeVideo: number = 0;
  public idVideo: number;
  public timelineSelectionsLastChangedIndex: number = 0;
  public created: string = '';
  public channelEnum = ChannelEnum;

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.observerChangeDate();
    this.getChannelId();
    this.player = new videojs(this.video.nativeElement, this.options);
    this.player.setInterval(() => this.displayCurrentTimeAndFrame(), 1);
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
    this.subscriptions.unsubscribe();
  }

  ngAfterViewInit() {
    this.canvasContext = this.canvas.nativeElement.getContext('2d');
  }

  observerChangeDate() {
    // verificar quando existe alguma data ja salva no filtro
    this.subscriptions.add(
      this.utilService.searchCalendarDateSubscription.subscribe((data) => {
        if (data && this.channelId) {
          this.getVideoUrl(this.channelId, data);
        }
      })
    );
  }

  getChannelId(): void {
    this.subscriptions.add(
      this.route.params.subscribe((params) => {
        if (params && params.id && params.channelType) {
          this.channelId = params.id;
          this.channelType = params.channelType;
          // reset ar after change between tv and radio
          this.aspectRatio = '16:9';
          this._aspectRatioValue = '885px';
          this.getVideoUrl(params.id);
        }
      })
    );
  }

  getVideoUrl(idChannel: number, date?: string): void {
    this.isLoading = true;
    this.videoService
      .getVideoUrl(idChannel, date)
      .pipe(take(1))
      .subscribe((data) => {
        this.changePlayerSource(data);
      });
  }

  getVideoMetadata(): void {
    this.player.on('loadedmetadata', () => {
      this.videoDuration.emit(this.player.duration());
      this.timelineSelections[1] = this.player.duration();
    });
  }

  getVideoPosterChange(): void {
    setTimeout(() => {
      this.takeSnapshot();
      this.sendThumb();
      this.clearSnapshot();
    }, 3000);
  }

  setFocusOnVideo(): void {
    const video: HTMLVideoElement = this.video.nativeElement;
    video.tabIndex = 0;
    video.focus();
  }

  takeSnapshot() {
    const videoHtml: HTMLCanvasElement = this.video.nativeElement;
    this.canvas.nativeElement.height = 720;
    this.canvas.nativeElement.width = 1280;
    this.canvasContext.fillRect(
      0,
      0,
      videoHtml.offsetWidth,
      videoHtml.offsetHeight
    );
    this.canvasContext.drawImage(videoHtml, 0, 0, 1280, 720);
    this.image = this.canvas.nativeElement.toDataURL('image/png');
  }

  clearSnapshot() {
    const videoHtml: HTMLCanvasElement = this.video.nativeElement;
    this.canvasContext.clearRect(
      0,
      0,
      videoHtml.offsetWidth,
      videoHtml.offsetHeight
    );
    this.image = null;
    this.canvas.nativeElement.height = undefined;
    this.canvas.nativeElement.width = undefined;
  }

  sendThumb() {
    this.thumbnail.emit(this.image);
  }

  playVideo() {
    if (this.player.paused()) {
      this.player.play();
    } else {
      this.player.pause();
    }
    this.videoSpeed = 1;
    this.player.playbackRate(this.videoSpeed);
    this.video.nativeElement.focus();
  }

  muteVideo() {
    if (this.player.muted()) {
      this.player.muted(false);
    } else {
      this.player.muted(true);
    }
  }

  public displayCurrentTimeAndFrame() {
    if (!this.player.paused()) {
      this.setTimeDisplayAndFrame();
    }
  }

  public setTimeDisplayAndFrame(): void {
    this.currentTimeDisplay = new Date(
      this.offSetTimeVideo + this.player.currentTime() * 1000
    )
      .toTimeString()
      .split(' ')[0];
    this.actualFrame = Number((this.player.currentTime() / 0.04).toFixed(0));
  }

  setUpVideoSpeed() {
    this.video.nativeElement.focus();
    if (this.videoSpeed <= 8) {
      this.videoSpeed = this.videoSpeed * 2;
      this.player.playbackRate(this.videoSpeed);
    }
  }

  setDownVideoSpeed() {
    this.video.nativeElement.focus();
    if (this.videoSpeed >= 0.25) {
      this.videoSpeed = this.videoSpeed / 2;
      this.player.playbackRate(this.videoSpeed);
    }
  }

  setPreviousVideo() {
    this.isLoading = true;
    this.videoService
      .getVideoUrlById(this.channelId, this.idPrevVideo)
      .pipe(take(1))
      .subscribe((data) => {
        this.changePlayerSource(data);
      });
  }

  setNextVideo() {
    this.isLoading = true;
    this.videoService
      .getVideoUrlById(this.channelId, this.idNextVideo)
      .pipe(take(1))
      .subscribe((data) => {
        this.changePlayerSource(data);
      });
  }

  changePlayerSource(videoSource: VideoPaginate): void {
    this.idPrevVideo = videoSource.prev;
    this.idNextVideo = videoSource.next;
    if (videoSource.video) {
      this.idVideo = videoSource.video.id;
      this.videoId.emit(videoSource.video.id);
      this.created = videoSource.video.createdAt;
      this.offSetTimeVideo = Number(
        new Date(videoSource.video.createdAt).getTime()
      );
      this.offsetTime.emit(this.offSetTimeVideo);
      this.currentTimeDisplay = new Date(videoSource.video.createdAt)
        .toTimeString()
        .split(' ')[0];
      this.player.src({
        src: videoSource.url,
        type: 'video/mp4',
      });
    }
    this.actualFrame = 0;
    this.getVideoMetadata();
    this.setFocusOnVideo();
    this.isLoading = false;
    this.startCutTime.emit(0);
    this.video.nativeElement.focus();
    if (this.channelType) {
      this.getVideoPosterChange();
    }
  }

  startCut(): void {
    this.startCutTime.emit(Number(this.player.currentTime()));
  }

  endCut(): void {
    this.endCutTime.emit(Number(this.player.currentTime()));
  }

  private listenArrowKeys(event: KeyboardEvent): void {
    if (this.player && this.isMouseOverVideo) {
      if (event.keyCode == 37) {
        this.player.currentTime(this.player.currentTime() - 0.04);
        this.timelineSelections[
          this.timelineSelectionsLastChangedIndex
        ] = this.player.currentTime();
        this.changeTime.emit(this.timelineSelections);
        this.setTimeDisplayAndFrame();
      }
      if (event.keyCode == 39) {
        this.player.currentTime(this.player.currentTime() + 0.04);
        this.timelineSelections[
          this.timelineSelectionsLastChangedIndex
        ] = this.player.currentTime();
        this.changeTime.emit(this.timelineSelections);
        this.setTimeDisplayAndFrame();
      }
    }
  }

  private listenSpaceKey(event: KeyboardEvent): void {
    if (this.player && this.isMouseOverVideo) {
      if (event.keyCode == 32) {
        this.playVideo();
      }
    }
  }

  private handlePlaybackrateKeydown(event: KeyboardEvent): void {
    if (this.player && this.isMouseOverVideo) {
      if (event.keyCode == 74) {
        this.setDownVideoSpeed();
      }
      if (event.keyCode == 76) {
        this.setUpVideoSpeed();
      }
    }
  }

  private handleNextPreviousVideo(event: KeyboardEvent): void {
    if (this.player && this.isMouseOverVideo) {
      if (event.keyCode == 83 && this.idNextVideo) {
        this.timelineSelectionsLastChangedIndex = 0;
        this.setNextVideo();
      }
      if (event.keyCode == 65 && this.idPrevVideo) {
        this.timelineSelectionsLastChangedIndex = 0;
        this.setPreviousVideo();
      }
    }
  }

  private handleStartEndCut(event: KeyboardEvent): void {
    if (this.player && this.isMouseOverVideo) {
      if (event.keyCode == 221) {
        this.startCut();
      }
      if (event.keyCode == 220) {
        this.endCut();
      }
    }
  }

  private playPreviewVideo(value: {
    start: number;
    finish: number;
    idVideo: number;
  }) {
    this.video.nativeElement.focus();
    this.player.currentTime(value.start);
    this.player.play();
    const intervalId = this.player.setInterval(() => {
      if (
        this.player.currentTime() > value.finish - 0.01 &&
        this.player.currentTime() < value.finish + 0.01
      ) {
        this.player.pause();
        this.player.clearInterval(intervalId);
      }
    }, 1);
  }

  private handleVideoPreview(value: {
    start: number;
    finish: number;
    idVideo: number;
  }): void {
    if (this.player) {
      if (this.idVideo == value.idVideo) {
        this.playPreviewVideo(value);
      } else {
        this.isLoading = true;
        this.videoService
          .getVideoUrlById(this.channelId, value.idVideo)
          .pipe(take(1))
          .subscribe((data) => {
            this.changePlayerSource(data);
            this.playPreviewVideo(value);
          });
      }
    }
  }

  private handleTimelineChanges(value: Array<number>): void {
    if (this.player) {
      this.video.nativeElement.focus();
      if (this.timelineSelections[0] !== value[0]) {
        this.timelineSelectionsLastChangedIndex = 0;
        this.timelineSelections = value;
        this.player.currentTime(value[0]);
        this.setTimeDisplayAndFrame();
      } else if (this.timelineSelections[1] !== value[1]) {
        this.timelineSelectionsLastChangedIndex = 1;
        this.timelineSelections = value;
        this.player.currentTime(value[1]);
        this.setTimeDisplayAndFrame();
      }
    }
  }
}
