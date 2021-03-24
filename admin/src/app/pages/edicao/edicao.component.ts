import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Select } from 'src/app/shared/models/select';
import {
  SocialMedia,
  SocialMediaEnum,
} from 'src/app/shared/models/socialMedia';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { ToastService } from '../../shared/services/toast.service';
import { CampaignsService } from '../campaigns/services/campaigns.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { ChannelEnum } from 'src/app/shared/models/channel';

@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.component.html',
  styleUrls: ['./edicao.component.scss'],
})
export class EdicaoComponent implements OnInit {
  public maxVideo: number;
  public rangeTimes: number[] = [0, 1];
  public videoId: number;
  public isGif: boolean = false;
  public aspectRatioValue: string = '16:9';

  public thumbnailPreview = '';

  public editionForm: FormGroup;

  public diferenceBetweenEndAndStart: string;

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

  public channelId: number;
  public channelType: number;
  public campaignOptions: Array<Select> = [
    {
      label: 'Selecione uma Campanha',
      id: 0,
    },
  ];

  public isSendingForm = false;
  public changeTimeVideo = 0;
  public videoPreview: { start: number; finish: number };

  public isDisabledChannels = false;
  public twitterAlert = '';
  public offsetVideo = 0;

  public minData = new Date();

  public calendarConfig = {
    firstDayOfWeek: 1,
    dayNames: [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    monthNames: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ],
    monthNamesShort: [
      'jan',
      'fev',
      'mar',
      'abr',
      'mai',
      'jun',
      'jul',
      'ago',
      'set',
      'out',
      'nov',
      'dez',
    ],
    today: 'Hoje',
    clear: 'Limpar',
    // dateFormat: 'dd.mm.yy hh:mm',
  };

  public channelEnum = ChannelEnum;
  public isUolMonetize: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private channelService: ChannelService,
    private toast: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private campaignsService: CampaignsService,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.observeRoute();
  }

  observeRoute(): void {
    this.route.params.subscribe((data) => {
      if (data && data.id && data.channelType) {
        this.channelId = data.id;
        this.channelType = data.channelType;
        this.createEditionForm();
        this.clearForm();
        this.getCampaignsList();
        this.getSocialMediasChannels(SocialMediaEnum.Facebook, 'idFacebook');
        this.getSocialMediasChannels(SocialMediaEnum.Twitter, 'idTwitter');
        this.getSocialMediasChannels(SocialMediaEnum.Youtube, 'idYoutube');
        this.getSocialMediasChannels(SocialMediaEnum.Uol, 'idUol');
        this.setGroupValidators();
      }
    });
  }

  getSocialMediasChannels(socialMediaId: number, channelName: string): void {
    this.channelService
      .getSocialMediaChannels(socialMediaId)
      .subscribe((data: Array<SocialMedia>) => {
        data.forEach((item) => {
          const selectItem: SelectItem = { label: item.name, value: item.id };
          this.channelsOptions[channelName].push(selectItem);
        });
        this.channelsOptions.all = this.channelsOptions.all.concat(
          this.channelsOptions[channelName]
        );
      });
  }

  getCampaignsList(): void {
    this.campaignsService
      .getCampaignsListByChannel(this.channelId)
      .subscribe((data) => {
        data.forEach((campaign) => {
          this.campaignOptions.push({ label: campaign.name, id: campaign.id });
        });
      });
  }

  createEditionForm(): void {
    this.editionForm = this.formBuilder.group({
      title: new FormControl({ value: '', disabled: false }, [
        Validators.required,
      ]),
      description: new FormControl({ value: '', disabled: false }, [
        Validators.required,
      ]),
      thumbnail: new FormControl({ value: '', disabled: false }),
      tags: new FormArray([]),
      cuts: new FormArray([]),
      socialMedias: new FormControl({ value: [], disabled: false }),
      idCampaign: new FormControl({ value: '', disabled: false }),
      schedulingDate: new FormControl('', []),
    });
  }

  get tags() {
    return this.editionForm.get('tags') as FormArray;
  }

  get cuts() {
    return this.editionForm.get('cuts') as FormArray;
  }

  getThumbnail(event) {
    if (this.channelType == this.channelEnum.TV) {
      this.thumbnailPreview = event;
      this.editionForm.patchValue({
        thumbnail: this.thumbnailPreview,
      });
    } else {
      this.editionForm.patchValue({
        thumbnail: 'https://pubimg.band.uol.com.br/files/226575c10bee82b4fa03.png',
      });
    }
  }

  getVideoDuration(event) {
    this.maxVideo = event;
    this.rangeTimes = [0, event];
  }

  formatTime(time) {
    return new Date(this.offsetVideo + time * 1000)
      .toTimeString()
      .split(' ')[0];
  }

  formatTimeCuts(offsetVideo, time) {
    return new Date(offsetVideo + time * 1000).toTimeString().split(' ')[0];
  }

  getVideoId(event) {
    this.videoId = event;
  }

  getOffsetTime(event) {
    this.offsetVideo = event;
  }

  getChangeTimeFromVideo(event) {
    this.rangeTimes = [...event];
  }

  setcut() {
    this.cuts.push(
      new FormControl({
        start: this.rangeTimes[0],
        finish: this.rangeTimes[1],
        sequence: this.cuts.length,
        idVideo: this.videoId,
        offsetTime: this.offsetVideo,
        cut: this.diferenceBetweenEndAndStart,
      })
    );
    this.verifyTwwiterAlert();
  }

  removeCut(index) {
    this.cuts.removeAt(index);
    this.cuts.controls.forEach((cut, i) => {
      cut.value.sequence = i;
    });
    this.verifyTwwiterAlert();
  }

  formatTimeCut(): any {
    this.cuts.controls.forEach((cut) => {
      const formattedStartValue =
        Number(Number((cut.value.start / 0.04).toFixed(0)) - 2) * 0.04;
      const formattedFinishValue =
        Number(Number((cut.value.finish / 0.04).toFixed(0)) - 1) * 0.04;
      cut.value.start = formattedStartValue > 0 ? formattedStartValue : 0;
      cut.value.finish = formattedFinishValue > 0 ? formattedFinishValue : 0;
    });
    return this.cuts.value;
  }

  public sendVideoEditon(): void {
    this.isSendingForm = true;
    this.editionForm.patchValue({
      socialMedias: this.setSocialMediasToUpload(),
    });
    if (this.thumbnailPreview) {
      this.createClipWithImage();
    } else {
      this.createClip();
    }
  }

  public async createClipWithImage(): Promise<void> {
    const image = await this.uploadImage();
    if (image) {
      this.editionForm.patchValue({
        thumbnail: image,
      });
      this.createClip();
    } else {
      this.isSendingForm = false;
      this.toast.message(
        'error',
        'Erro',
        'Ocorreu um erro ao subir o thumbnail'
      );
    }
  }

  public createClip(): void {
    this.channelService.saveVideoEdition(this.createPayload()).subscribe(
      (data) => {
        this.isSendingForm = false;
        this.toast.message('success', 'Sucesso', 'Video gravado com sucesso!');
        this.clearForm();
        // this.route.navigate(['/queue-clips']);
      },
      (err) => {
        console.log('err', err);
        this.isSendingForm = false;
        this.toast.message('error', 'Erro', 'Ocorreu um erro');
      }
    );
  }

  public clearForm(): void {
    if (this.editionForm) {
      this.editionForm.reset();
      this.cuts.clear();
      this.tags.clear();
    }
    if (this.channelType == this.channelEnum.Radio) {
      this.editionForm.patchValue({
        thumbnail: 'https://pubimg.band.uol.com.br/files/226575c10bee82b4fa03.png',
      });
    }
    this.thumbnailPreview = null;
    this.channelsOptions.monetize = [];
    this.clearSocialMediasArray();
    this.isGif = false;
  }

  public async uploadImage() {
    const file = this.utilService.transFormFile(
      this.thumbnailPreview,
      'file.webp'
    );
    const [image] = await this.utilService.uploadImage(file).toPromise();
    return image;
  }

  public createPayload() {
    let payload: any = {
      title: this.editionForm.get('title').value,
      description: this.editionForm.get('description').value,
      tags: this.editionForm.get('tags').value.join(';'),
      cuts: this.formatTimeCut(),
      socialMedias: this.setSocialMediasToUpload(),
      thumbnail: this.isGif ? '' : this.editionForm.get('thumbnail').value,
      gif: this.isGif,
      aspectRatio: this.aspectRatioValue,
    };
    if (this.isDisabledChannels) {
      payload.idCampaign = this.editionForm.get('idCampaign').value.id;
      return payload;
    } else {
      return payload;
    }
  }

  plusTag(): void {
    this.tags.push(new FormControl(''));
  }

  removeTag(index: number): void {
    this.tags.removeAt(index);
  }

  getChangeTimes(event): void {
    this.changeTimeVideo = event.values;
  }

  getStartCutTime(startTime: number) {
    this.rangeTimes = [startTime, this.rangeTimes[1]];
    if (this.rangeTimes[0] > this.rangeTimes[1]) {
      this.rangeTimes[1] = this.rangeTimes[0];
    }
  }

  getEndCutTime(endTime: number) {
    this.rangeTimes = [this.rangeTimes[0], endTime];
    if (this.rangeTimes[1] < this.rangeTimes[0]) {
      this.rangeTimes[0] = this.rangeTimes[1];
    }
  }

  getDiferenceBetweenEndAndStart(): string {
    const dif = this.rangeTimes[1] - this.rangeTimes[0];
    const sub = this.offsetVideo - this.offsetVideo + dif * 1000;

    let diferenceBetweenEndAndStart: any = new Date(sub)
      .toTimeString()
      .split(' ')[0];
    diferenceBetweenEndAndStart = diferenceBetweenEndAndStart.split(':');

    this.diferenceBetweenEndAndStart = `${diferenceBetweenEndAndStart[1]}:${diferenceBetweenEndAndStart[2]}`;

    // const result = (this.rangeTimes[1] - this.rangeTimes[0]).toFixed(2);
    //
    // this.diferenceBetweenEndAndStart = result;

    return this.diferenceBetweenEndAndStart;
  }

  setPreview(i): void {
    this.videoPreview = { ...this.cuts.controls[i].value };
  }

  setSocialMediasToUpload(): Array<{ idSocialMedia: number }> {
    const socialMediaArray: Array<{
      idSocialMedia: number;
      monetize: boolean;
    }> = [];

    this.socialMediasIdSelected.all.forEach((id) => {
      const isMonetized: boolean = this.socialMediasIdSelected.monetize.includes(
        id
      );
      socialMediaArray.push({ idSocialMedia: id, monetize: isMonetized });
    });
    return socialMediaArray;
  }

  public refreshSocialMediasSelected(): void {
    const mediasNameArray: Array<string> = [
      'idYoutube',
      'idFacebook',
      'idUol',
      'idTwitter',
    ];
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
    this.hasUolSocialMediaSelected();
  }

  public setGroupValidators() {
    this.editionForm.get('idCampaign').valueChanges.subscribe((select) => {
      if (select && select.id) {
        this.isDisabledChannels = true;
        this.clearSocialMediasArray();
      } else {
        this.isDisabledChannels = false;
      }
    });
  }

  clearSocialMediasArray(): void {
    const mediasNameArray: Array<string> = [
      'idYoutube',
      'idFacebook',
      'idUol',
      'idTwitter',
      'monetize',
      'all',
    ];
    mediasNameArray.forEach((media) => {
      this.socialMediasIdSelected[media] = [];
    });
  }

  verifyTwwiterAlert(): void {
    let acc = 0;
    this.cuts.controls.forEach((cut) => {
      acc = acc + (cut.value.finish - cut.value.start);
    });
    if (acc > 45) {
      this.twitterAlert = 'Cuidado! Twitter possui limite de 45s para video!';
    } else {
      this.twitterAlert = '';
    }
  }

  verifyMinimumCutAlert(): string {
    if (this.cuts.length <= 0) {
      return 'É necessário que exista pelo menos 1 corte de vídeo';
    }
  }

  public async getThumbnailClip(
    event,
    inputHtml: HTMLInputElement
  ): Promise<void> {
    const image64 = await this.utilService.transFormBase64(
      event.target.files[0]
    );
    this.thumbnailPreview = image64;
    this.editionForm.patchValue({
      thumbnail: image64,
    });
    inputHtml.value = null;
  }

  downloadImage() {
    const { thumbnail } = this.editionForm.value;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const image = new Image();
    document.getElementById('original').appendChild(image);

    image.onload = (e) => {
      const pixelWidth = 200;
      const scale = pixelWidth / image.width;
      canvas.width = scale * image.width;
      canvas.height = scale * image.height;
      ctx.drawImage(
        image,
        0,
        0,
        image.width,
        image.height,
        0,
        0,
        canvas.width,
        canvas.height
      );
      // create a new base64 encoding
      const resampledImage = new Image();
      resampledImage.src = canvas.toDataURL();
      document.getElementById('resampled').appendChild(resampledImage);
      const a = image.src.length;
      const b = resampledImage.src.length;
      // alert('Savings: ' + Math.floor(100*(a-b)/a) + '%');
    };
  }

  public handlerUolChange(evento): void {
    const tagsArray: Array<string> = this.tags.value;
    const snIndex = tagsArray.findIndex((tag) => {
      return tag === 'sn';
    });
    if (evento.checked) {
      if (snIndex > -1) {
        this.tags.removeAt(snIndex);
      }
    } else {
      if (snIndex == -1) {
        this.tags.push(new FormControl('sn'));
      }
    }
  }

  public hasUolSocialMediaSelected(): void {
    if (this.socialMediasIdSelected['idUol'].length > 0) {
      this.isUolMonetize = true;
      this.handlerUolChange({ checked: true });
    } else {
      this.isUolMonetize = false;
      const tagsArray: Array<string> = this.tags.value;
      const snIndex = tagsArray.findIndex((tag) => {
        return tag === 'sn';
      });
      if (snIndex > -1) {
        this.tags.removeAt(snIndex);
      }
    }
  }
}
