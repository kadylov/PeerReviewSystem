import { Component, OnInit } from '@angular/core';
import {LayoutConfigService, SparklineChartOptions} from "../../../core/_base/layout";
import {Widget4Data} from "../../partials/content/widgets/widget4/widget4.component";
import { shuffle } from 'lodash';

@Component({
  selector: 'kt-public-page',
  templateUrl: './public-page.component.html',
  styleUrls: ['./public-page.component.scss']
})
export class PublicPageComponent implements OnInit {
  chartOptions1: SparklineChartOptions;
  chartOptions2: SparklineChartOptions;
  chartOptions3: SparklineChartOptions;
  chartOptions4: SparklineChartOptions;
  widget4_1: Widget4Data;
  widget4_2: Widget4Data;
  widget4_3: Widget4Data;
  widget4_4: Widget4Data;



  constructor() { }

  ngOnInit(): void {

  }

}
