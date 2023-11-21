import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosEditComponent } from './usuarios-edit.component';

describe('UsuariosAddComponent', () => {
  let component: UsuariosEditComponent;
  let fixture: ComponentFixture<UsuariosEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
