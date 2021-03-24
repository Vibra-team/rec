import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { QueueFilter } from 'src/app/shared/models/queueFilter';
import { UtilService } from 'src/app/shared/services/util.service';
import { Router } from '@angular/router';


import { QueueClip, SocialMediaQueue } from './models/queue-clip';
import { QueueClipService } from './services/queue-clip.service';
import { Clip } from '../../shared/models/clip';

@Component({
  selector: 'app-queue-clips',
  templateUrl: './queue-clips.component.html',
  styleUrls: ['./queue-clips.component.scss']
})
export class QueueClipsComponent implements OnInit, OnDestroy {

  public clipsArray: Array<QueueClip> = new Array<QueueClip>();
  public isLoading: boolean = true;
  public showClipDetail: boolean = false;
  public clipDetail: QueueClip;

  public queueFilter: QueueFilter;
  public pagination: { page: number, total: number, quantity: number } = {
    page: 1,
    total: 0,
    quantity: 10
  };

  public intervalId;
  public subscriptions: Subscription = new Subscription();

  public sharedModal = false;

  public selectedShareClip: Clip;

  constructor(
    public queueClipService: QueueClipService,
    public datePipe: DatePipe,
    public utilService: UtilService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.subscriptions.add(this.utilService.queueFilterSubscription.subscribe((data) => {
      this.pagination = { page: 1, total: 0, quantity: 10 };
      this.clipsArray = [];
      if (data) {
        this.queueFilter = data;
        this.getQueueClipList(data);
      } else {
        this.getQueueClipList();
      }
    }));
    this.intervalId = setInterval(() => {
      this.getQueueClipList(this.queueFilter);
    }, 60000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
    this.subscriptions.unsubscribe();
  }

  public getQueueClipList(queueFilter?: QueueFilter): void {
    this.isLoading = true;
    this.queueClipService.getQueueClipList(this.pagination, queueFilter)
      .pipe(take(1))
      .subscribe((data) => {
        this.clipsArray = data.result;
        this.pagination.total = data.total;
        this.isLoading = false;
      });
  }

  public seeClipDetails(clip: QueueClip): void {
    this.showClipDetail = true;
    this.clipDetail = clip;
  }

  public paginate(eventPaginate): void {
    this.pagination.page = eventPaginate.page + 1;
    this.getQueueClipList(this.queueFilter);
  }

  public formatTime(dateString: string): string {
    const timeInSeconds: number = new Date(dateString).getTime() / 1000;
    const dateNow: number = new Date().getTime() / 1000;
    if ((dateNow - (60 * 1)) <= timeInSeconds) {
      return `agora`;
    }
    if ((dateNow - (60 * 59)) <= timeInSeconds) {
      return `há ${Math.floor((dateNow - timeInSeconds) / 60)} minutos`;
    } else {
      return this.datePipe.transform(dateString, 'dd/MM/yyyy HH:mm');
    }
  }

  public formatStatus(statusCode: number): string {
    switch (statusCode) {
      case 3:
        return 'aguardando upload';
      case 2:
        return 'publicado';
      case 1:
        return 'gerando clip';
      case -1:
        return 'erro';

      default: '';
        break;
    }
  }

  public removeRepeatedSocialMedia(socialMedias: Array<SocialMediaQueue>): Array<SocialMediaQueue> {
    let filteredSocialMedias: Array<SocialMediaQueue> = [];
    socialMedias.forEach((media) => {
      const hasRepeatedMedia = filteredSocialMedias.find((item) => {
        return item.socialMedia === media.socialMedia;
      });
      if (!hasRepeatedMedia) {
        filteredSocialMedias.push(media);
      }
    });
    return filteredSocialMedias;
  }

  public downloadClip(clipId: number): void {
    this.queueClipService.downloadClip(clipId)
      .subscribe(response => {
        window.open(response.url, '_blank');
      });
  }

  public shareModal = (clip) => {
    this.sharedModal = true;
    this.selectedShareClip = clip;
  }

  public shareModalClose = (event) => {
    this.sharedModal = event;
    this.getQueueClipList();
  }

  public formatClipSizeinMB(size: number): string {
    if (size) {
      return Number((size / 1024) / 1000).toFixed(2).toString() + ' MB';
    } else {
      return '';
    }
  }

}
