import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChannelManagementService } from '../../services/channel-management.service';
import { UtilService } from '../../../../shared/services/util.service';
import { ToastService } from '../../../../shared/services/toast.service';

import { Channel, ChannelType, ActiveValues } from '../../../../shared/models/channel';


@Component({
  selector: 'app-channel-form',
  templateUrl: './channel-form.component.html',
  styleUrls: ['./channel-form.component.scss']
})
export class ChannelFormComponent implements OnInit {

  public isLoading = false;

  public channelForm: FormGroup;
  public imageFile: File;

  public idChannel: string;

  public activeValues: ActiveValues[] = [
    { id: false, name: 'Inativo' },
    { id: true, name: 'Ativo' },
  ];

  public channelTypeOptions: ChannelType[] = [
    { id: 1, label: 'Rádio' },
    { id: 2, label: 'Televisão' },
  ];

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private formBuilder: FormBuilder,
    private channelManagementService: ChannelManagementService,
    private utilService: UtilService,
    private toast: ToastService,
  ) { }

  ngOnInit(): void {
    this.initChannelForm();
    this.observeRouteId();
  }

  initChannelForm(): void {
    this.channelForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      path: new FormControl('', [Validators.required]),
      folder: new FormControl('', [Validators.required]),
      active: new FormControl(false, [Validators.required]),
      channelType: new FormControl(null, [Validators.required]),
      image: new FormControl('', [Validators.required]),
    });
  }

  submitChannelForm(): void {
    if (this.imageFile) {
      this.utilService.uploadImage(this.imageFile)
        .subscribe((data: Array<string>) => {
          this.channelForm.patchValue({
            image: data[0],
          });
          this.sendForm();
        });
    } else {
      this.sendForm();
    }
  }

  sendForm(): void {

    if (this.idChannel) {
      this.editForm();
    } else {
      this.newForm();
    }

  }

  buildObj(): Channel {
    return {
      ...this.channelForm.value,
      channelType: this.channelForm.value.channelType.id
    };
  }

  newForm(): void {
    this.isLoading = true;
    const formToSend = this.buildObj();

    this.channelManagementService.submitChannel(formToSend)
      .subscribe(response => {
        this.toast.message('success', 'Sucesso', 'Canal salvo com sucesso!');
        this.isLoading = false;
        this.route.navigate(['/gerenciamento-canais']);
      }, (err) => {
        console.log(err);
        this.toast.message('error', 'Erro', 'Ocorreu um erro');
        this.isLoading = false;
      });
  }

  editForm(): void {
    this.isLoading = true;

    const objToSend = this.buildObj();
    this.channelManagementService.updateChannel(this.idChannel, objToSend)
      .subscribe(response => {
        this.toast.message('success', 'Sucesso', 'Canal atualizado com sucesso!');
        this.isLoading = false;
        this.route.navigate(['/gerenciamento-canais']);
      }, (err) => {
        console.log(err);
        this.toast.message('error', 'Erro', 'Ocorreu um erro');
        this.isLoading = false;
      });
  }

  public observeRouteId(): void {
    this.router.params.subscribe(
      (routeParam) => {
        const { id } = routeParam;

        if (id) {
          this.idChannel = id;
          this.channelManagementService.getChannelById(id)
            .subscribe((response) => {

              const [channelTypeById] = this.channelTypeOptions.filter(value => value.id === response.channelType);

              this.channelForm.patchValue({
                ...response,
                channelType: channelTypeById
              });
            });
        }
      });
  }

  public async getImageChannel(evento, inputElement: HTMLInputElement): Promise<void> {
    const file = await this.utilService.transFormBase64(evento.target.files[0]);
    this.imageFile = evento.target.files[0];
    this.channelForm.patchValue({
      image: file,
    });
    inputElement.value = null;
  }

  routeToList(): void {
    this.route.navigate(['/gerenciamento-canais']);
  }

}
