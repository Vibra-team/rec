import { Component, OnInit } from '@angular/core';
import { Channel } from 'src/app/shared/models/channel';
import { ChannelService } from 'src/app/shared/services/channel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public channelList: Array<Channel> = [];
  public tvChannelList: Array<Channel> = [];
  public radioChannelList: Array<Channel> = [];
  public isLoadingMenu = true;

  constructor(
    private channelService: ChannelService,
  ) { }

  ngOnInit(): void {
    this.getChannelList();
  }

  public getChannelList(): void {
    this.channelService.getChannelList()
      .subscribe((data: Array<Channel>) => {
        this.channelList = data;
        this.radioChannelList = data.filter(value => value.channelType === 1);
        this.tvChannelList = data.filter(value => value.channelType === 2);
        this.isLoadingMenu = false;
      });
  }
}
