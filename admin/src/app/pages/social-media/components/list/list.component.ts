import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from 'src/app/shared/services/toast.service';

import { UtilService } from '../../../../shared/services/util.service';
import { ResultPaginate, SocialMidia } from '../../models/social-midias.model';
import { SocialMediaService } from '../../service/social-media.service';

export enum SocialMediaEnum {
  'Facebook' = 1,
  'Twitter' = 2,
  'Youtube' = 3,
  'Uol' = 4,
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public enumSocialMidia = SocialMediaEnum;
  public socialMedias: SocialMidia[];

  public paginate: { pageIndex: number; pageSize: number; total: number } = {
    pageIndex: 0,
    pageSize: 10,
    total: 0,
  };

  public filter = {
    name: '',
    active: '',
    socialmedia: '',
    psize: '10',
    pindex: '0',
  };

  public checked = true;

  constructor(
    public socialMediaService: SocialMediaService,
    private utilService: UtilService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.buscaSocialMedias();
  }

  buscaSocialMedias() {
    this.utilService.showSpinner();
    this.socialMediaService.getSocialMedia(this.filter).subscribe(
      (resp: ResultPaginate) => {
        const { result, pageIndex, pageSize, total } = resp;
        this.socialMedias = result;
        this.paginate.pageIndex = pageIndex;
        this.paginate.pageSize = pageSize;
        this.paginate.total = total;
        this.utilService.hideSpinner();
      },
      () => {
        this.utilService.hideSpinner();
      }
    );
  }

  handleChangePaginate(event: {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
  }): void {
    this.paginate.pageIndex = event.page;
    this.paginate.pageSize = event.rows;
    this.filter.pindex = String(event.page);
    this.buscaSocialMedias();
  }

  filtrarLista(name, active, socialmedia) {
    this.paginate;

    this.filter = {
      name,
      active,
      socialmedia,
      psize: '10',
      pindex: '0',
    };

    this.buscaSocialMedias();
  }

  editaMidiaSocial(id: string) {
    this.router.navigate([`/midia-social/edit/${id}`]);
  }

  deletaMidia(id: string, nome: string) {
    this.confirmationService.confirm({
      message: `Gostaria de deletar a mídia ${nome} ?`,
      header: 'Confirmação',
      icon: 'pi pi-check-circle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.utilService.showSpinner();
        this.socialMediaService.deleteMidia(id).subscribe(
          () => {
            this.toastService.message(
              'success',
              'Sucesso',
              'Mídia deletado com sucesso.'
            );
            this.utilService.hideSpinner();
            this.filter = {
              ...this.filter,
              psize: '10',
              pindex: '0',
            };
            this.buscaSocialMedias();
          },
          () => {
            this.toastService.message(
              'error',
              'Erro',
              'Ocorreu um erro ao deletar  mídia.'
            );
            this.utilService.hideSpinner();
          }
        );
      },
      reject: () => {},
    });
  }
}
