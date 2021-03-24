import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { SocialMedia, SocialMediaEnum } from 'src/app/shared/models/socialMedia';
import { SelectItem } from 'primeng/api';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-new-upload',
  templateUrl: './new-upload.component.html',
  styleUrls: ['./new-upload.component.scss']
})
export class NewUploadComponent implements OnInit {

  public uploadForm: FormGroup;
  public thumbnailImageFile: File;
  public isDisabledChannels: boolean = false;

  public campaignOptions: Array<any> = [{
    id: 0, label: 'Selecione uma Campanha'
  }, {
    id: 1, label: 'Campanha 1'
  }];

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

  public videoFile: File;
  public isSendingForm: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private utilService: UtilService,
    private channelService: ChannelService,
    private toast: ToastService,
  ) { }

  ngOnInit(): void {
    this.createUploadForm();
    this.getSocialMediasChannels(SocialMediaEnum.Facebook, 'idFacebook');
    this.getSocialMediasChannels(SocialMediaEnum.Twitter, 'idTwitter');
    this.getSocialMediasChannels(SocialMediaEnum.Youtube, 'idYoutube');
    this.getSocialMediasChannels(SocialMediaEnum.Uol, 'idUol');
  }

  getSocialMediasChannels(socialMediaId: number, channelName: string): void {
    this.channelService.getSocialMediaChannels(socialMediaId)
      .subscribe((data: Array<SocialMedia>) => {
        data.forEach((item) => {
          const selectItem: SelectItem = { label: item.name, value: item.id };
          this.channelsOptions[channelName].push(selectItem);
        });
        this.channelsOptions.all = this.channelsOptions.all.concat(this.channelsOptions[channelName]);
      });
  }

  public refreshSocialMediasSelected(): void {
    const mediasNameArray: Array<string> = ['idYoutube', 'idFacebook', 'idUol', 'idTwitter'];
    this.channelsOptions.monetize = [];
    this.socialMediasIdSelected.monetize = [];
    this.socialMediasIdSelected.all = [];

    mediasNameArray.forEach((mediaType) => {
      const idValues: Array<number> = this.socialMediasIdSelected[mediaType];
      if (idValues.length) {
        this.socialMediasIdSelected[mediaType].forEach((media) => {
          this.channelsOptions.all.forEach((channel) => {
            if (media == channel.value) {
              this.channelsOptions.monetize.push(channel);
              this.socialMediasIdSelected.all.push(media);
            }
          });
        });
      }
    });
    this.socialMediasIdSelected.monetize = this.socialMediasIdSelected.all;
  }

  public async getThumbnailUpload(evento, inputElement: HTMLInputElement): Promise<void> {
    const file = await this.utilService.transFormBase64(evento.target.files[0]);
    this.thumbnailImageFile = evento.target.files[0];
    this.uploadForm.patchValue({
      thumbnail: file,
    });
    inputElement.value = null;
  }

  private createUploadForm(): void {
    this.uploadForm = this.formBuilder.group({
      title: new FormControl({ value: '', disabled: false }, [Validators.required]),
      description: new FormControl({ value: '', disabled: false }, [Validators.required]),
      thumbnail: new FormControl({ value: '', disabled: false }),
      tags: new FormArray([]),
      cuts: new FormArray([]),
      socialMedias: new FormControl({ value: [], disabled: false }),
    })
  }

  get tags() {
    return this.uploadForm.get('tags') as FormArray;
  }

  addTag(): void {
    this.tags.push(new FormControl(''));
  }

  removeTag(index: number): void {
    this.tags.removeAt(index);
  }

  clearSocialMediasArray(): void {
    const mediasNameArray: Array<string> = ['idYoutube', 'idFacebook', 'idUol', 'idTwitter', 'monetize', 'all'];
    mediasNameArray.forEach((media) => {
      this.socialMediasIdSelected[media] = [];
    });
  }

  public getFileUpload(evento, inputElement: HTMLInputElement): void {
    this.videoFile = evento.target.files[0];
    inputElement.value = null;
  }

  public sendUploadVideo() {
    this.isSendingForm = true;
    this.uploadForm.patchValue({
      socialMedias: this.setSocialMediasToUpload(),
    });
    if (this.thumbnailImageFile) {
      this.createUploadWithImage();
    } else {
      this.createClip();
    }
  }

  public async createUploadWithImage(): Promise<void> {
    const image = await this.uploadImage();
    if (image) {
      this.uploadForm.patchValue({
        thumbnail: image,
      });
      this.createClip();
    } else {
      this.isSendingForm = false;
      this.toast.message('error', 'Erro', 'Ocorreu um erro ao subir o thumbnail');
    }
  }

  public createClip(): void {
    const payload = this.createPayload();
    this.channelService.saveVideoEdition(payload)
      .subscribe((data) => {
        this.channelService.uploadVideo(data.id, this.videoFile)
          .subscribe((response) => {
            this.isSendingForm = false;
            this.toast.message('success', 'Sucesso', 'Video gravado com sucesso!');
            this.uploadForm.reset();
            this.tags.clear();
            this.thumbnailImageFile = null;
            this.videoFile = null;
            this.channelsOptions.monetize = [];
            this.clearSocialMediasArray();
          });
      }, (err) => {
        console.log('err', err);
        this.isSendingForm = false;
        this.toast.message('error', 'Erro', 'Ocorreu um erro');
      });
  }

  public createPayload() {
    return {
      title: this.uploadForm.get('title').value,
      description: this.uploadForm.get('description').value,
      tags: this.uploadForm.get('tags').value.join(';'),
      socialMedias: this.setSocialMediasToUpload(),
      thumbnail: this.uploadForm.get('thumbnail').value
    };
  }

  public async uploadImage() {
    const [image] = await this.utilService.uploadImage(this.thumbnailImageFile).toPromise();
    return image;
  }

  public setSocialMediasToUpload(): Array<{ idSocialMedia: number }> {
    const socialMediaArray: Array<{ idSocialMedia: number, monetize: boolean }> = [];

    this.socialMediasIdSelected.all.forEach((id) => {
      const isMonetized: boolean = this.socialMediasIdSelected.monetize.includes(id);
      socialMediaArray.push({ idSocialMedia: id, monetize: isMonetized });
    });
    return socialMediaArray;
  }

}
