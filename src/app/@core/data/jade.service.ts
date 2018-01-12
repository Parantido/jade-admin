import { Subscription } from 'rxjs/Subscription';
import { OneColumnLayoutComponent } from './../../@theme/layouts/one-column/one-column.layout';
// import { WebsocketService } from './websocket.service';
import {$WebSocket, WebSocketSendMode} from 'angular2-websocket/angular2-websocket';
import { Http, Response } from '@angular/http';
import { Injectable, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable, Subscriber} from 'rxjs/Rx';
import * as TAFFY from 'taffy';

@Injectable()
export class JadeService {
  private baseUrl: string = "http://localhost:8081";
  private websockUrl: string = "ws://localhost:8083";

  // sockets
  // private websock: WebsocketService;
  private websock: $WebSocket;

  // databases
  private db_agent_agents = TAFFY();

  private db_core_channels = TAFFY();
  private db_core_systems = TAFFY();

  private db_ob_campaigns = TAFFY();
  private db_ob_destinations = TAFFY();
  private db_ob_dialings = TAFFY();
  private db_ob_dlmas = TAFFY();
  private db_ob_dls = TAFFY();
  private db_ob_plans = TAFFY();

  private db_park_parkinglots = TAFFY();
  private db_park_parkedcalls = TAFFY();

  private db_pjsip_aors = TAFFY();
  private db_pjsip_auths = TAFFY();
  private db_pjsip_contacts = TAFFY();
  private db_pjsip_endpoints = TAFFY();
  private db_pjsip_transports = TAFFY();

  private db_queue_entries = TAFFY();
  private db_queue_members = TAFFY();
  private db_queue_queues = TAFFY();

  private db_vm_users = TAFFY();
  private db_vm_messages = TAFFY();
  private db_vm_settings = TAFFY();

  private targets = [
    ["/agent/agents", this.db_agent_agents],

    ["/core/channels", this.db_core_channels],
    ["/core/systems", this.db_core_systems],

    ["/ob/campaigns", this.db_ob_campaigns],
    ["/ob/destinations", this.db_ob_destinations],
    ["/ob/dialings", this.db_ob_dialings],
    ["/ob/dlmas", this.db_ob_dlmas],
    ["/ob/dls", this.db_ob_dls],
    ["/ob/plans", this.db_ob_plans],

    ["/park/parkinglots", this.db_park_parkinglots],
    ["/park/parkedcalls", this.db_park_parkedcalls],

    ["/pjsip/aors", this.db_pjsip_aors],
    ["/pjsip/auths", this.db_pjsip_auths],
    ["/pjsip/contacts", this.db_pjsip_contacts],
    ["/pjsip/endpoints", this.db_pjsip_endpoints],
    ["/pjsip/transports", this.db_pjsip_transports],

    ["/queue/entries", this.db_queue_entries],
    ["/queue/members", this.db_queue_members],
    ["/queue/queues", this.db_queue_queues],

    ["/voicemail/users", this.db_vm_users],
    ["/voicemail/vms", this.db_vm_messages],
    ["/voicemail/settings", this.db_vm_settings]
  ];


  constructor(private http: Http) {
    console.log("Fired JadeService constructor.");

    this.init_database();
    this.init_websock();


    // for(var i = 0; i < this.targets.length; i++) {
    //   let target = this.targets[i];
    //   console.log("Initiating target. " + target[0]);

    //   // get data
    //   this.http.get(this.baseUrl + target[0]).map(res => res.json())
    //   .subscribe(
    //     (data) => {
    //       let list = data.result.list;
    //       for(var j = 0; j < list.length; j++) {
    //         target[1].insert(list[j]);
    //       }
    //     },
    //     (err) => {
    //       console.log("Could not get data. url: " + target[0] + ' ' + err);
    //     }
    //   );
    // }
  }

  init_database() {
    for(var i = 0; i < this.targets.length; i++) {
      let target = this.targets[i];
      console.log("Initiating target. " + target[0]);

      // get data
      this.http.get(this.baseUrl + target[0]).map(res => res.json())
      .subscribe(
        (data) => {
          let list = data.result.list;
          for(var j = 0; j < list.length; j++) {
            target[1].insert(list[j]);
          }
        },
        (err) => {
          console.log("Could not get data. url: " + target[0] + ' ' + err);
        }
      );
    }
  }

  init_websock() {
    console.log("Fired init_websock.");

    this.websock = new $WebSocket(this.websockUrl);
    this.websock.setSend4Mode(WebSocketSendMode.Direct);
    this.websock.send('{"type":"subscribe", "topic":"/"}');
    // this.websock.send('{"type":"subscribe", "topic":"/"}').publish().connect();

    // set received message callback
    this.websock.onMessage(
      (msg: MessageEvent)=> {
          console.log("onMessage ", msg.data);
      },
      {autoApply: false}
    );



    // this.websock = new WebsocketService();

    // let openSubscriber = Subscriber.create(() =>
    //   this.websock.send('{"type":"subscribe", "topic":"/"}'));

    // this.websock.createObservableSocket(this.websockUrl, openSubscriber);

    // // // register message handler
    // // this.websock.onmessage = (event) => this.message_handler;

    // // register message handler
    // this.websock.ws.onmessage = this.message_handler;
  }

  message_handler(event) {
    console.log(event);
  }

  get_core_system() {
    return this.db_core_systems;
  }

  get_core_channels() {
    return this.db_core_channels;
  }


  OnInit() {
    console.log("OnInit!!");
    console.log("BaseUrl: " + this.baseUrl);
  }

  private init_jade_data() {

  }

}
