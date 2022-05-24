import { Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateRange, MatCalendar } from '@angular/material/datepicker';
import { startOfDay, endOfDay, format, subDays, startOfMonth, subMonths, lastDayOfMonth, startOfQuarter, subQuarters, endOfQuarter } from 'date-fns';

@Component({
  selector: 'date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.css']
})
export class DateRangePickerComponent {

  @Output() selectedRangeValueChange = new EventEmitter<DateRange<Date>>();
  @Input() selectedRangeValue: DateRange<Date> = new DateRange<Date>(startOfDay(new Date()), endOfDay(new Date()));
  @ViewChild(MatCalendar) matCalendar!: MatCalendar<any>;
  @ViewChild('pickerPanelOrigin', { read: ElementRef }) private _pickerPanelOrigin!: ElementRef;
  @ViewChild('dateRangePickerPanel') private _pickerPanel!: TemplateRef<any>;
  selected!: Date | null;
  templatePortal!: TemplatePortal<any>;
  overlay: any;
  dateRanges: any[] = [
    {
      id: 'today',
      label: 'Today',
    },
    {
      id: 'yesterday',
      label: 'Yesterday',
    },
    {
      id: 'last7Days',
      label: 'Last 7 days',
    },
    {
      id: 'lastMonth',
      label: 'Last month',
    },
    {
      id: 'lastQuarter',
      label: 'Last quarter',
    },
    {
      id: 'monthToDate',
      label: 'Month to date',
    },
    {
      id: 'quarterToDate',
      label: 'Quarter to date',
    }
  ];
  startDate = new FormControl(format(new Date(), 'dd-MM-yyyy'));
  endDate = new FormControl(format(new Date(), 'dd-MM-yyyy'));

  constructor(
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef,
  ) { };

  selectedChange(m: any): any {
    if (!this.selectedRangeValue?.start || this.selectedRangeValue?.end) {
      this.selectedRangeValue = new DateRange<Date>(m, null);
      this.startDate.setValue(format(this.selectedRangeValue.start as Date, 'dd-MM-yyyy'));
    } else {
      const start = this.selectedRangeValue.start;
      const end = m;
      if (end < start) {
        this.selectedRangeValue = new DateRange<Date>(end, start);
      } else {
        this.selectedRangeValue = new DateRange<Date>(start, end);
      }
      this.startDate.setValue(format(start, 'dd-MM-yyyy'));
      this.endDate.setValue(format(end, 'dd-MM-yyyy'));
    }
  }

  setDateRange(selRange: string): void {
    const today = new Date();
    switch (selRange) {
      case 'today':
        this.selectedRangeValue = new DateRange<Date>(startOfDay(today), endOfDay(today));
        break;

      case 'yesterday':
        this.selectedRangeValue = new DateRange<Date>(subDays(startOfDay(today), 1), subDays(endOfDay(today), 1));
        break;

      case 'last7Days':
        this.selectedRangeValue = new DateRange<Date>(subDays(today, 7), today);
        break;

      case 'lastMonth':
        this.selectedRangeValue = new DateRange<Date>(startOfMonth(subMonths(today, 1)), lastDayOfMonth(subMonths(today, 1)));
        break;

      case 'lastQuarter':
        this.selectedRangeValue = new DateRange<Date>(startOfQuarter(subQuarters(today, 1)), endOfQuarter(subQuarters(today, 1)));
        break;

      case 'monthToDate':
        this.selectedRangeValue = new DateRange<Date>(startOfMonth(today), today);
        break;

      case 'quarterToDate':
        this.selectedRangeValue = new DateRange<Date>(startOfQuarter(today), today);
        break;

      default:
        break;
    }
    this.startDate.setValue(format(this.selectedRangeValue.start as Date, 'dd-MM-yyyy'));
    this.endDate.setValue(format(this.selectedRangeValue.end as Date, 'dd-MM-yyyy'));
    this.matCalendar._goToDateInView(this.selectedRangeValue.start, 'month');

  }

  openPickerPanel(): void {
    // Create the overlay
    this.overlay = this._overlay.create({
      panelClass: 'fuse-date-range-panel',
      backdropClass: '',
      hasBackdrop: true,
      scrollStrategy: this._overlay.scrollStrategies.reposition(),
      positionStrategy: this._overlay.position()
        .flexibleConnectedTo(this._pickerPanelOrigin)
        .withPositions([
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
          },
          {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'bottom',
          }
        ])
    });

    // Create a portal from the template
    this.templatePortal = new TemplatePortal(this._pickerPanel, this._viewContainerRef);

    // On backdrop click
    this.overlay.backdropClick()
      .subscribe(() => {

        // If template portal exists and attached...
        if (this.templatePortal && this.templatePortal.isAttached) {
          // Detach it
          this.templatePortal.detach();
        }

        // If overlay exists and attached...
        if (this.overlay && this.overlay.hasAttached()) {
          // Detach it
          this.overlay.detach();
          this.overlay.dispose();
        }
      });

    // Attach the portal to the overlay
    this.overlay.attach(this.templatePortal);
  }

  closePickerPanel(): void {
    if (this.templatePortal && this.templatePortal.isAttached) {
      this.templatePortal.detach();
    }
    if (this.overlay && this.overlay.hasAttached()) {
      this.overlay.detach();
      this.overlay.dispose();
    }
  }

  applyAndClosePickerPanel(): void {
    this.selectedRangeValueChange.emit(this.selectedRangeValue);
    if (this.templatePortal && this.templatePortal.isAttached) {
      // Detach it
      this.templatePortal.detach();
    }

    // If overlay exists and attached...
    if (this.overlay && this.overlay.hasAttached()) {
      // Detach it
      this.overlay.detach();
      this.overlay.dispose();
    }
  }

}
