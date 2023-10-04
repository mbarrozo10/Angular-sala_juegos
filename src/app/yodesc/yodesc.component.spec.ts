import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { YodescComponent } from './yodesc.component';

describe('YodescComponent', () => {
  let component: YodescComponent;
  let fixture: ComponentFixture<YodescComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YodescComponent], imports: [MatIconModule, MatListModule, 
        MatSidenavModule,MatToolbarModule, MatButtonModule, MatFormField, MatLabel]
    });
    fixture = TestBed.createComponent(YodescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
