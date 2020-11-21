import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import {UserService} from '../../services/user.service';
import {GLOBAL} from '../../services/global';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    providers: [UserService,]
})
export class SidebarComponent implements OnInit {
    public url;
    public identity;
    public token;
    public stats;
    public status;

    constructor(
        private _userService: UserService,
  
    ) {
        this.url = GLOBAL.url;
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.stats = this._userService.getStats();
    }

    ngOnInit() {
        console.log('[OK] Component: sidebar.');
        this.getCounter(this.identity._id);
    }

    getCounter(id) {
        this._userService.getCounter(id).subscribe(
            response => {
                this.stats = response;
            },
            error => {
                console.log(<any>error);
            }
        );
    }
}
