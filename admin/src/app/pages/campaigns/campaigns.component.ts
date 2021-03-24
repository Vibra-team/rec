import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { CampaignsService } from './services/campaigns.service';
import { Campaign } from '../../shared/models/campaign';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {

  public campaignList: Array<Campaign> = [];
  public campaignListMemory: Array<Campaign> = [];
  public isLoading: boolean = true;
  public campaignForm: FormGroup;

  constructor(
    private campaignsService: CampaignsService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getCampaignsList();
    this.createCampaignForm();
    this.listenCampaignFormField();
  }

  getCampaignsList(): void {
    this.isLoading = true;
    this.campaignsService.getCampaignsList()
      .subscribe((data) => {
        this.campaignList = data;
        this.campaignListMemory = data;
        this.isLoading = false;
      });
  }

  createCampaignForm(): void {
    this.campaignForm = this.formBuilder.group({
      campaign: new FormControl(''),
    });
  }

  listenCampaignFormField(): void {
    this.campaignForm.get('campaign').valueChanges
      .pipe(
        debounceTime(600),
        distinctUntilChanged(),
      )
      .subscribe((data: string) => {
        this.campaignList = this.campaignListMemory;
        this.campaignList = this.campaignList.filter((campaign) => {
          return campaign.name.toLowerCase().includes(data.toLowerCase());
        });
      });
  }

  createNewCampaign(): void {
    this.router.navigate(['/campaigns/new']);
  }

}
