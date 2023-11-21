import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosRouteComponent } from './pedidos-route.component';

describe('PedidosRouteComponent', () => {
  let component: PedidosRouteComponent;
  let fixture: ComponentFixture<PedidosRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidosRouteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidosRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
