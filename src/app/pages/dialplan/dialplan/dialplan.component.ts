import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { JadeService } from '../../../@core/data/jade.service';

@Component({
  selector: 'ngx-app-dialplan-dialplan',
  templateUrl: './dialplan.component.html',
})
export class DialplanComponent implements OnInit {

  list_name: string = 'Dialplan dialplans';
  detail: any;
  source: LocalDataSource = new LocalDataSource();

  constructor(private service: JadeService) {
    console.log('Fired DialplanComponent.');
    this.detail = {};

    const db = service.get_dp_dialplans();

    this.source.load(db().get());
    db.settings({
      onDBChange: () => { this.source.load(db().get()); },
    });
  }

  ngOnInit() {
  }

  settings = {
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    actions: {
      add: false,
      edit: false,
      delete: true,
      columnTitle: '',
    },
    columns: {
      dpma_uuid: {
        title: 'DPMA uuid',
        type: 'string',
      },
      sequence: {
        title: 'sequence',
        type: 'string',
      },
      name: {
        title: 'Name',
        type: 'string',
      },
      detail: {
        title: 'Detail',
        type: 'string',
      },
      command: {
        title: 'Command',
        type: 'string',
      },
    },
  }

  onRowSelect(event): void {
    this.detail = Object.assign({}, event.data);
    delete this.detail.___id;
    delete this.detail.___s;
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      // this.service.delete_queue_entry(event.data.unique_id);
    }
  }

}
