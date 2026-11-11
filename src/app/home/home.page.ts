import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonModal, IonButton, IonButtons, IonInput, IonItem, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { HomeService } from './home-service';
import { Task, TaskDTO } from "./tasks.model";
import { OverlayEventDetail, RefresherCustomEvent } from '@ionic/core/components';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrls: ['home.page.scss'],
  imports: [FormsModule,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonModal,
    IonTitle,
    IonRefresher,
    IonToolbar,],
})
export class HomePage {

  @ViewChild(IonModal) modal!: IonModal;

  private serviceHome = inject(HomeService);
  tareas: Task[] = [];
  tareita: TaskDTO = {};
  title: string = '';
  description: string = '';

  constructor() { }

  ngOnInit() {
    this.handleRefresh();
  }

  handleRefresh(event?: RefresherCustomEvent) {
    this.serviceHome.listarTareas().subscribe({
      next: (data: Task[]) => {
        this.tareas = data;
        event?.target.complete();
      }, error: (err) => {
        console.log(err);
      }
    })
  }



  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {

    this.tareita = {
      title: this.title,
      description: this.description,
      isDone: false
    }

    this.serviceHome.crearTarea(this.tareita).subscribe({
      next: (data: Task) => {
        console.log(data);
        this.tareas.push(data);
      }, error: (err) => {
        console.log(err);
      }
    })
    this.modal.dismiss(this.title, 'confirm');
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {

    }
  }

}