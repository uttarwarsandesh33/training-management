import { Injector, EventEmitter, ErrorHandler } from '@angular/core';
import * as APP_CONSTANTS from './constants/constants';
import * as ROUTE_CONSTANTS from './constants/routing-constants'
import * as URL_CONSTANTS from './constants/url-constants'
import { EventService } from '../services/event.service';
import { CacheService } from '../services/cache.service';
import { ToastService } from '../services/toast.service';
import { WindowScrolling } from '../components/loading/WindowScrolling';
import * as PATTERN from '../common/validations/pattern-constants';
import { FirebaseService } from '../services/firebase/firebase-services';
export class BaseApp {

    // this will help to share data within 
    eventService: EventService;
    CONSTANTS: any;
    ROUTE_CONSTANTS: any;
    URL_CONSTANTS: any;
    PATTERN_CONSTANTS: any;
    cache: CacheService;
    toastService: ToastService;
    firebaseService: FirebaseService;
    private loading = false;
    windowScrolling = new WindowScrolling();
    constructor(
        injector: Injector
    ) {
        this.CONSTANTS = APP_CONSTANTS;
        this.ROUTE_CONSTANTS = ROUTE_CONSTANTS;
        this.URL_CONSTANTS = URL_CONSTANTS;
        this.PATTERN_CONSTANTS = PATTERN;
        this.eventService = injector.get(EventService);
        this.cache = injector.get(CacheService);
        this.toastService = injector.get(ToastService);
        this.firebaseService = injector.get(FirebaseService);
    }

    presentLoading(data) {
        console.log('present loading called')
        this.eventService.loading = data;
        if (data) {
            this.windowScrolling.disable();
        } else {
            this.windowScrolling.enable();
        }
    }

}

export class TrainingErrorHandler implements ErrorHandler {
    handleError(error) {
        console.log(error);
    }
}

