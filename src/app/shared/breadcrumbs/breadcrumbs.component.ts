import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  titulo: string = '';
  tituloSubs$: Subscription;
  constructor(private router: Router) {
    this.tituloSubs$ = this.getParametroRuta().subscribe(({ titulo }) => {
      this.titulo = titulo;
      document.title = `Admin - ${titulo}`;
    });
  }

  getParametroRuta() {
    return this.router.events.pipe(
      filter((evet: any) => evet instanceof ActivationEnd),
      filter((evet: ActivationEnd) => evet.snapshot.firstChild === null),
      map((evet: ActivationEnd) => evet.snapshot.data)
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }
}
