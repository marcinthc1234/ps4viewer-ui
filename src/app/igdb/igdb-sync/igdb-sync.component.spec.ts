import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IgdbSyncComponent } from './igdb-sync.component';

describe('IgdbSyncComponent', () => {
  let component: IgdbSyncComponent;
  let fixture: ComponentFixture<IgdbSyncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IgdbSyncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IgdbSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
