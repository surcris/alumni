import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirstConnexionPage } from './first-connexion.page';

describe('FirstConnexionPage', () => {
  let component: FirstConnexionPage;
  let fixture: ComponentFixture<FirstConnexionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstConnexionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
