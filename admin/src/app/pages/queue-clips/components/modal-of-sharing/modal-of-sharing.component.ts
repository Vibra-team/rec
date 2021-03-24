import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {SocialMedia, SocialMediaEnum} from '../../../../shared/models/socialMedia';
import {SelectItem} from 'primeng/api';
import {UtilService} from '../../../../shared/services/util.service';
import {Router} from '@angular/router';
import {ChannelService} from '../../../../shared/services/channel.service';
import {ToastService} from '../../../../shared/services/toast.service';
import { Clip } from '../../../../shared/models/clip';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal-of-sharing',
  templateUrl: './modal-of-sharing.component.html',
  styleUrls: ['./modal-of-sharing.component.scss']
})
export class ModalOfSharingComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  sharedModal: boolean;

  @Output('shareModal')
  public shareModal: EventEmitter<boolean> = new EventEmitter();

  @Input()
  clip: Clip;

  public subscriptions: Subscription = new Subscription();

  public sharingModalForm: FormGroup;

  public thumbnailPreview = '';

  public isGif = false;

  public taging: FormArray;

  public tagsArray: string[] = [];


  public channelsOptions = {
    idYoutube: [],
    idFacebook: [],
    idUol: [],
    idTwitter: [],
    monetize: [],
    all: [],
  };

  public socialMediasIdSelected = {
    idYoutube: [],
    idFacebook: [],
    idUol: [],
    idTwitter: [],
    monetize: [],
    all: [],
  };

  constructor(
    public utilService: UtilService,
    private router: Router,
    private channelService: ChannelService,
    private toast: ToastService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getSocialMediasChannels(SocialMediaEnum.Facebook, 'idFacebook');
    this.getSocialMediasChannels(SocialMediaEnum.Twitter, 'idTwitter');
    this.getSocialMediasChannels(SocialMediaEnum.Youtube, 'idYoutube');
    this.getSocialMediasChannels(SocialMediaEnum.Uol, 'idUol');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.clip) {
      this.fillForm();
    }
  }

  getSocialMediasChannels(socialMediaId: number, channelName: string): void {
    this.subscriptions.add(this.channelService.getSocialMediaChannels(socialMediaId)
      .subscribe((data: Array<SocialMedia>) => {
        data.forEach((item) => {
          const selectItem: SelectItem = { label: item.name, value: item.id };
          this.channelsOptions[channelName].push(selectItem);
        });
        this.channelsOptions.all = this.channelsOptions.all.concat(this.channelsOptions[channelName]);
      }));
  }

  initForm = () => {
    this.sharingModalForm = this.formBuilder.group({
      // title: new FormControl({ value: '', disabled: false }, [Validators.required]),
      // description: new FormControl({ value: '', disabled: false }, [Validators.required]),
      // thumbnail: new FormControl({ value: '', disabled: false }),
      // tags: new FormControl(this.tagsArray),
      socialMedias: new FormControl({ value: [], disabled: false }),
      // gif: new FormControl(false, []),
    });
  }

  private fillForm = (): void => {
    this.socialMediasIdSelected = {
      ...this.socialMediasIdSelected,
      idFacebook: [],
      idTwitter: [],
      idYoutube: [],
      idUol: [],
    };

    this.clip.socialMedias.map(value => {
      switch (value.socialMedia) {
        case 1:
          this.socialMediasIdSelected.idFacebook.push(value.idSocialMedia);
          break;
        case 2:
          this.socialMediasIdSelected.idTwitter.push(value.idSocialMedia);
          break;
        case 3:
          this.socialMediasIdSelected.idYoutube.push(value.idSocialMedia);
          break;
        case 4:
          this.socialMediasIdSelected.idUol.push(value.idSocialMedia);
          break;
      }
    });
  }

  public getThumbnail(event): void {
    this.thumbnailPreview = event;
    this.sharingModalForm.patchValue({
      thumbnail: this.thumbnailPreview,
    });
  }

  public async getThumbnailClip(event, inputHtml: HTMLInputElement): Promise<void> {
    const image64 = await this.utilService.transFormBase64(event.target.files[0]);
    this.thumbnailPreview = image64;
    this.sharingModalForm.patchValue({
      thumbnail: image64,
    });
    inputHtml.value = null;
  }

  // addTag(): void {
  //   this.tagsArray.push('');
  // }

  // fillTag(tag: string): void {
  //   this.tagsArray[this.tagsArray.length - 1] = tag;
  // }
  //
  // removeTag(index: number): void {
  //   this.tagsArray = this.tagsArray.filter((value, i) => i !== index);
  // }

  mountToSubmit = () => {
    const arr = this.getAllSocialMediaArrays();
    this.sharingModalForm.patchValue({
      socialMedias: [...arr]
    });
  }

  getAllSocialMediaArrays = (): any[] => {
    const arr = [];
    this.socialMediasIdSelected.idFacebook.map(value => arr.push(Number(value)));
    this.socialMediasIdSelected.idTwitter.map(value => arr.push(Number(value)));
    this.socialMediasIdSelected.idYoutube.map(value => arr.push(Number(value)));
    this.socialMediasIdSelected.idUol.map(value => arr.push(Number(value)));

    return arr;
  }


  public onSubmit = () => {
    this.mountToSubmit();

    this.channelService.update(this.clip.id, this.sharingModalForm.value)
      .subscribe(response => {
        // console.log('response', response);
        this.shareModal.emit(false);
        this.toast.message('success', 'Sucesso', 'Publicado com sucesso!');
      }, (err) => {
        console.log('erro no envio do formulpario.', err);
        this.toast.message('success', 'Sucesso', 'Publicado com sucesso!');
      });
  }

  public onShowModal = () => {
    // console.log('onShowModal');
    // this.resetForm();
  }

  public fecharModal(): void {
    this.shareModal.emit(false);
    // this.resetForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
