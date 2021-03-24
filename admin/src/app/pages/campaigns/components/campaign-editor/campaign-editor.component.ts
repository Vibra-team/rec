import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Campaign } from 'src/app/shared/models/campaign';
import { Channel } from 'src/app/shared/models/channel';
import { Select } from 'src/app/shared/models/select';
import { SocialMedia, SocialMediaEnum } from 'src/app/shared/models/socialMedia';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { CampaignsService } from '../../services/campaigns.service';

@Component({
  selector: 'app-campaign-editor',
  templateUrl: './campaign-editor.component.html',
  styleUrls: ['./campaign-editor.component.scss']
})
export class CampaignEditorComponent implements OnInit {

  public campaignId: number;
  public isLoading: boolean = true;
  public channelOptions: Array<Select> = [];
  public youtubeOptions: Array<Select> = [];
  public facebookOptions: Array<Select> = [];
  public twitterOptions: Array<Select> = [];
  public uolOptions: Array<Select> = [];
  public campaignForm: FormGroup;
  public isSendingForm: boolean = false;
  public thumbnailImageFile: File;

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private campaignsService: CampaignsService,
    private formBuilder: FormBuilder,
    private channelService: ChannelService,
    private toast: ToastService,
    private utilService: UtilService,
  ) { }

  ngOnInit(): void {
    this.observeRouteId();
    this.createCampaignForm();
  }

  public createCampaignForm(): void {
    this.campaignForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      channel: new FormControl({ value: '', disabled: true }, [Validators.required]),
      facebook: new FormControl({ value: '', disabled: true }),
      twitter: new FormControl({ value: '', disabled: true }),
      youtube: new FormControl({ value: '', disabled: true }),
      uol: new FormControl({ value: '', disabled: true }),
      thumbnail: new FormControl({ value: '', disabled: false }),
    });
  }

  public observeRouteId(): void {
    this.router.params.subscribe(
      (routeParam) => {
        this.channelService.getAllSelects()
          .subscribe((data) => {
            const [channel, facebook, twitter, uol, youtube] = data;
            this.populateSelects(channel, facebook, twitter, uol, youtube);
            if (Number(routeParam.id)) {
              this.campaignId = routeParam.id;
              this.getCampaignById(routeParam.id);
            } else {
              this.isLoading = false;
            }
          });
      });
  }

  public populateSelects(channel: Array<Channel>, facebook: Array<SocialMedia>, twitter: Array<SocialMedia>, uol: Array<SocialMedia>, youtube: Array<SocialMedia>): void {
    this.facebookOptions = facebook.map((item) => { return { label: item.name, id: item.id } });
    this.twitterOptions = twitter.map((item) => { return { label: item.name, id: item.id } });
    this.uolOptions = uol.map((item) => { return { label: item.name, id: item.id } });
    this.youtubeOptions = youtube.map((item) => { return { label: item.name, id: item.id } });
    this.channelOptions = channel.map((item) => { return { label: item.name, id: item.id } });
    this.campaignForm.controls['channel'].enable();
    this.campaignForm.controls['facebook'].enable();
    this.campaignForm.controls['twitter'].enable();
    this.campaignForm.controls['youtube'].enable();
    this.campaignForm.controls['uol'].enable();
  }

  public formatToForm(data: Campaign, socialMediaId: number): Array<{ id: number }> {
    const filteredSocialMedia: Array<any> = data.socialMedias.filter((media) => {
      return media.socialMedia === socialMediaId
    });
    const formattedArray: Array<{ id: number }> = filteredSocialMedia.map((item) => {
      return { id: item.idSocialMedia };
    });
    return formattedArray;
  }

  public getCampaignById(id): void {
    this.isLoading = true;
    this.campaignsService.getCampaignById(id)
      .subscribe((data) => {
        this.campaignForm.patchValue({
          name: data.name,
          channel: { id: data.idChannel },
          facebook: this.formatToForm(data, SocialMediaEnum.Facebook),
          twitter: this.formatToForm(data, SocialMediaEnum.Twitter),
          youtube: this.formatToForm(data, SocialMediaEnum.Youtube),
          uol: this.formatToForm(data, SocialMediaEnum.Uol),
          thumbnail: data.thumbnail,
        });
        this.isLoading = false;
      });
  }

  createPayload(): any {
    const channel: Select = this.campaignForm.get('channel').value;
    const facebook: Array<Select> = this.campaignForm.get('facebook').value;
    const twitter: Array<Select> = this.campaignForm.get('twitter').value;
    const youtube: Array<Select> = this.campaignForm.get('youtube').value;
    const uol: Array<Select> = this.campaignForm.get('uol').value;
    const name: string = this.campaignForm.get('name').value;
    const thumbnail: string = this.campaignForm.get('thumbnail').value;

    let socialMedias: Array<{ idSocialMedia: number }> = [];
    if (facebook.length) {
      facebook.forEach((item) => {
        socialMedias.push({ idSocialMedia: item.id })
      });
    }
    if (twitter.length) {
      twitter.forEach((item) => {
        socialMedias.push({ idSocialMedia: item.id })
      });
    }
    if (youtube.length) {
      youtube.forEach((item) => {
        socialMedias.push({ idSocialMedia: item.id })
      });
    }
    if (uol.length) {
      uol.forEach((item) => {
        socialMedias.push({ idSocialMedia: item.id })
      });
    }
    return {
      name: name,
      idChannel: channel.id,
      socialMedias: socialMedias,
      active: true,
      thumbnail: thumbnail,
    }
  }

  submitForm() {
    this.isSendingForm = true;
    if (this.thumbnailImageFile) {
      this.utilService.uploadImage(this.thumbnailImageFile)
        .subscribe((data: Array<string>) => {
          this.campaignForm.patchValue({
            thumbnail: data[0],
          });
          this.updateOrCreateCampaign();
        });
    } else {
      this.updateOrCreateCampaign();
    }
  }

  public updateOrCreateCampaign(): void {
    if (this.campaignId) {
      this.updateCampaign();
    } else {
      this.createCampaign();
    }
  }

  public createCampaign(): void {
    this.campaignsService.createCampaign(this.createPayload())
      .subscribe((data) => {
        this.toast.message('success', 'Sucesso', 'Campanha salva com sucesso!');
        this.route.navigate(['/campaigns']);
      }, (err) => {
        console.log(err);
        this.toast.message('error', 'Erro', 'Ocorreu um erro');
        this.isSendingForm = false;
      });
  }

  public updateCampaign(): void {
    this.campaignsService.updateCampaign(this.campaignId, this.createPayload())
      .subscribe((data) => {
        this.toast.message('success', 'Sucesso', 'Campanha salva com sucesso!');
        this.route.navigate(['/campaigns']);
      }, (err) => {
        console.log(err);
        this.toast.message('error', 'Erro', 'Ocorreu um erro');
        this.isSendingForm = false;
      });
  }

  public async getThumbnailCampaign(evento, inputElement: HTMLInputElement): Promise<void> {
    const file = await this.utilService.transFormBase64(evento.target.files[0]);
    this.thumbnailImageFile = evento.target.files[0];
    this.campaignForm.patchValue({
      thumbnail: file,
    });
    inputElement.value = null;
  }

}
