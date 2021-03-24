import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Calendar } from 'primeng/calendar';
import { QueueFilter } from 'src/app/shared/models/queueFilter';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('searchDate') searchDate: Calendar;
  @ViewChild('queueSearchDate') queueSearchDate: Calendar;

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

  public showCalendar: boolean = false;
  public showNav: boolean = true;
  public searchForm: FormGroup;

  public user: { nome: string, role: string } = { nome: 'Usuário Desconhecido', role: 'Usuário Desconhecido' }

  public showQueueFilter: boolean = false;
  public queueForm: FormGroup;
  public queueFilter: QueueFilter = {
    searchDate: null,
    status: null,
    type: null,
    time: null,
    channel: null,
  };

  public statusOptions: Array<SelectItem> = [{
    label: 'Selecionar Todos',
    value: null
  },{
    label: 'Publicado',
    value: 2
  }, {
    label: 'Pendente',
    value: 1
  }, {
    label: 'Erro',
    value: -1
  }];

  public typeOptions: Array<SelectItem> = [{
    label: 'Vídeo',
    value: 2
  }, {
    label: 'Gif',
    value: 1
  }, {
    label: 'Imagem',
    value: -1
  }];

  public timeOptions: Array<SelectItem> = [{
    label: 'Mais Recentes',
    value: 2
  }, {
    label: 'Mais Antigos',
    value: 1
  }];

  public channelOptions: Array<SelectItem> = [{
    label: 'Selecionar Todos',
    value: null
  }];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private utilService: UtilService,
    private datePipe: DatePipe,
    private channelService: ChannelService,
  ) {
    this.showCalendar = this.router.url.includes('edicao');
    this.showQueueFilter = this.router.url.includes('queue-clips');
  }

  ngOnInit(): void {
    this.observeRouteParams();
    this.createSearchForm();
    this.getUserLoggedName();
    this.observerHideNav();
    this.createQueueSearchForm();
    this.getChannelList();
    this.listenQueueChannel();
    this.listenQueueStatus();
  }

  observeRouteParams(): void {
    this.router.events.subscribe((data) => {
      if (data instanceof NavigationStart) {
        this.showCalendar = data.url.includes('edicao');
        this.showQueueFilter = data.url.includes('queue-clips');
      }
    });
  }

  createSearchForm(): void {
    this.searchForm = this.formBuilder.group({
      searchDate: new FormControl({ value: null, disabled: false }),
    });
  }

  createQueueSearchForm(): void {
    this.queueForm = this.formBuilder.group({
      searchDate: new FormControl({ value: null, disabled: false }),
      status: new FormControl({ value: null, disabled: false }),
      type: new FormControl({ value: null, disabled: false }),
      time: new FormControl({ value: null, disabled: false }),
      channel: new FormControl({ value: null, disabled: true }),
    });
  }

  searchByDate() {
    const formattedDate: string = this.datePipe.transform(this.searchForm.get('searchDate').value, 'yyyy-MM-dd HH:mm');
    this.utilService.setSearchCalendarDate(formattedDate);
    this.searchDate.hideOverlay();
  }

  searchQueueByDate() {
    this.formatFormValuesToFilterValues(this.queueForm);
    this.utilService.setQueueFilter(this.queueFilter);
    this.queueSearchDate.hideOverlay();
  }

  listenQueueChannel(): void {
    this.queueForm.get('channel').valueChanges.subscribe((data: SelectItem) => {
      if (data) {
        this.formatFormValuesToFilterValues(this.queueForm);
        this.utilService.setQueueFilter(this.queueFilter);
      }
    });
  }

  listenQueueStatus(): void {
    this.queueForm.get('status').valueChanges.subscribe((data: SelectItem) => {
      if (data) {
        this.formatFormValuesToFilterValues(this.queueForm);
        this.utilService.setQueueFilter(this.queueFilter);
      }
    });
  }

  getUserLoggedName(): void {
    if (this.utilService.user) {
      this.user = JSON.parse(this.utilService.user);
    }
  }

  public observerHideNav(): void {
    this.utilService.showNavSubscription
      .subscribe((data) => {
        this.showNav = data;
      });
  }

  hideShowNavBar(): void {
    this.utilService.setShowNav(!this.showNav)
  }

  getChannelList(): void {
    this.channelService.getChannelList()
      .subscribe((data) => {
        this.channelOptions = [{
          label: 'Selecionar Todos',
          value: null
        }];
        data.forEach((item) => {
          const selectItem: SelectItem = { label: item.name, value: item.id };
          this.channelOptions.push(selectItem);
        });
        this.queueForm.controls['channel'].enable();
      });
  }

  formatFormValuesToFilterValues(formValues: FormGroup): void {
    const searchDate: string = formValues.get('searchDate').value;
    const status: SelectItem = formValues.get('status').value;
    const channel: SelectItem = formValues.get('channel').value;

    this.queueFilter.searchDate = (searchDate) ? this.datePipe.transform(searchDate, 'yyyy-MM-dd HH:mm') : null;
    this.queueFilter.status = (status && status.value) ? status.value : null;
    this.queueFilter.channel = (channel && channel.value) ? channel.value : null;
  }

  clearDateField(): void {
    this.queueForm.patchValue({
      searchDate: null,
    });
    this.searchQueueByDate();
  }

}
