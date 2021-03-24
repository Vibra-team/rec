import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UtilService } from 'src/app/shared/services/util.service';

import { SocialMidia } from '../../models/social-midias.model';
import { SocialMediaService } from '../../service/social-media.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  public id: number;
  public form: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private utilService: UtilService,
    private socialMediaService: SocialMediaService,
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.iniciaFormulario();
    this.observaRota();
  }

  observaRota() {
    this.activatedRoute.params.subscribe(({ id }) => {
      if (id) {
        this.id = id;
        this.buscaSocialMidiaPorId(String(this.id));
      }
    });
  }

  buscaSocialMidiaPorId(id: string) {
    this.utilService.showSpinner();
    this.socialMediaService
      .getSocialMediaById(id)
      .subscribe((resp: SocialMidia) => {
        this.preencheFormulario(resp);
        this.utilService.hideSpinner();
      });
  }

  iniciaFormulario() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      active: [false, [Validators.required]],
      socialMedia: ['', [Validators.required]],
      credential: ['', [Validators.required]],
    });
  }

  preencheFormulario({ name, active, socialMedia, credential }) {
    this.form.patchValue({
      name,
      active,
      socialMedia,
      credential,
    });
  }

  submitForm() {
    const { name, active, socialMedia, credential } = this.form.value;

    if (this.id) {
      const form = {
        name,
        active,
        socialMedia: Number(socialMedia),
        credential,
      };
      this.utilService.showSpinner();
      this.socialMediaService
        .putSocialMediaById(String(this.id), form)
        .subscribe(
          () => {
            this.utilService.hideSpinner();
            this.toastService.message(
              'success',
              'Sucesso',
              'Mídia editada com sucesso.'
            );
          },
          () => {
            this.utilService.hideSpinner();
            this.toastService.message(
              'error',
              'Erro',
              'Ocorreu um erro ao editar mídia.'
            );
          }
        );
    } else {
      const form = {
        name,
        active,
        socialMedia: Number(socialMedia),
        credential,
      };
      this.utilService.showSpinner();
      this.socialMediaService.postSocialMediaById(form).subscribe(
        () => {
          this.utilService.hideSpinner();
          this.toastService.message(
            'success',
            'Sucesso',
            'Mídia criada com sucesso.'
          );
        },
        () => {
          this.utilService.hideSpinner();
          this.toastService.message(
            'error',
            'Erro',
            'Ocorreu um erro ao criar mídia.'
          );
        }
      );
    }
  }
}
