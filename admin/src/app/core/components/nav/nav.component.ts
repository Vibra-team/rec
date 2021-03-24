import { Component, OnInit } from '@angular/core';
import { Channel, ChannelEnum } from 'src/app/shared/models/channel';
import { UtilService } from 'src/app/shared/services/util.service';
import { ChannelService } from '../../../shared/services/channel.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  public menuObject = [
    {
      title: 'streaming',
      sections: [
        {
          name: 'Canais',
          icon: 'fas fa-play-circle',
          open: false,
          items: [
            {
              name: 'televisão',
              icon: 'fas fa-desktop',
              subItems: [],
            },
            {
              name: 'radio',
              icon: 'fas fa-volume-up',
              subItems: [],
            },
          ],
        },
      ],
    },
  ];

  public menuGerenciamento = [
    {
      title: 'Gerenciamento',
      sections: [
        {
          name: 'Clips',
          icon: 'fas fa-list',
          open: false,
          id: '/queue-clips',
        },
        {
          name: 'Campanhas',
          icon: 'fas fa-list',
          open: false,
          id: '/campaigns',
        },
        {
          name: 'Gerenciamento de Canais',
          icon: 'fas fa-list',
          open: false,
          id: '/gerenciamento-canais',
        },
        {
          name: 'Upload de Videos',
          icon: 'fas fa-upload',
          open: false,
          id: '/upload',
        },
        {
          name: 'Mídias sociais',
          icon: 'fas fa-list',
          open: false,
          id: '/midia-social',
        },

        // {
        //   name: 'Gerenciamento de Canais',
        //   icon: 'fas fa-list',
        //   open: false,
        //   id: '/gerenciamento-canais',
        // },
      ],
    },
  ];

  public isLoadingMenu = true;
  public showNav = true;

  constructor(
    private channelService: ChannelService,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.getChannelList();
    this.observerHideNav();
  }

  public getChannelList(): void {
    this.channelService.getChannelList().subscribe((data: Array<Channel>) => {
      data.forEach((item) => {
        if (item.channelType === ChannelEnum.Radio) {
          this.menuObject[0].sections[0].items[1].subItems.push({ name: item.name, id: item.id, channelType: item.channelType });
        }
        if (item.channelType === ChannelEnum.TV) {
          this.menuObject[0].sections[0].items[0].subItems.push({
            name: item.name,
            id: item.id,
            channelType: item.channelType,
          });
        }
      });
      this.isLoadingMenu = false;
    });
  }

  public observerHideNav(): void {
    this.utilService.showNavSubscription.subscribe((data) => {
      this.showNav = data;
    });
  }

  public openNav(): void {
    this.showNav = true;
    this.utilService.setShowNav(this.showNav);
  }

  openClosedMenu(section: any): boolean {
    return (section.open = !section.open);
  }
}
