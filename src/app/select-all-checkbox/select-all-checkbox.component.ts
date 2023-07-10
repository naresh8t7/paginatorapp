import {
  Component,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer,
  ElementRef,
  forwardRef,
  DoCheck
} from '@angular/core';
import { Pipe, PipeTransform, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { debounceTime, throttleTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-select-all-checkbox',
  template: `<input #theCheckbox type="checkbox" [(ngModel)]="topLevel" (change)="topLevelChange()">`
})

export class SelectAllCheckboxComponent implements AfterViewInit, OnInit, DoCheck, OnDestroy {
  public topLevel: boolean = false;
  public records: Array<any>;
  private subscription: Subscription;
  @Input() items: Observable<any[]>;
  @ViewChild('theCheckbox', {static: false}) checkbox;

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  private setState() {
    if (!this.records) { return; }
    let count = 0;
    let i = 0;
    for (; i < this.records.length; i++) {
      count += this.records[i].isSelected ? 1 : 0;
    }
    this.topLevel = (count === 0) ? false : true;
    if (count > 0 && count < i) {
      console.log('Setting indeterminate.');
      this.checkbox.nativeElement.indeterminate = true;
    } else {
      console.log('Removing indeterminate.');
      this.checkbox.nativeElement.indeterminate = false;
    }
  }

  ngDoCheck() {
    this.setState();
  }

  public topLevelChange() {
    console.log('Clicked. ' + this.topLevel);
    for (const record of this.records) {
      record.isSelected = this.topLevel;
    }
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.subscription = this.items.subscribe(res => {
      console.log('Subscription triggered.');
      this.records = res;
      this.setState();
      this.changeDetectorRef.detectChanges();
    });
  }

}
