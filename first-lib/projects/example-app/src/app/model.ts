/* eslint-disable @typescript-eslint/naming-convention */

import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";

export interface Outlet {
  id: string;
  isActive: boolean;
  sort: number;
  name: string;
  metadata: Metadata |null;
  machineCode?: string;
  internalName: string;
  status?: Status;
  bizType: IDLabelModule | null;
  zone: IDLabel | null;
  outletUrlId?: string;
  features: Feature;
  franchise: IDLabel | null;
  tax?: IDLabel[] | null;
  location?: {
    address: string;
    zip: string;
    lat: number;
    long: number;
    geopoint?: { lat: number , lng: number};
  };
  display?: {
    subtitle?: string;
    video?: string;
    outletColor?: string;
    mobileBanner?: ImgUploadType;
    webBanner?: ImgUploadType;
    logo?: ImgUploadType;
    gallery?: MultiImgUploadType[];
  };
  config?: {
    category?: IDLabel[];
    tag?: IDLabel[];
    featured?: IDLabel[];
    prepTime?: number;
  };
  override?: {
    isPayment?: boolean;
    isOpHours?: boolean;
    isCommission?: boolean;
    isServiceArea?: boolean;
    isTimeSlot?: boolean;
    isSubscription?: boolean;
    isTax?: boolean;
    isItem?: boolean;
  };
  communication?: {
    display?: {
      phone?: number[];
    };
    notify?: {
      callAdmin?: number[];
      callManager?: number[];
      notifyWhatsapp?: number[];
      notifyEmail?: string[];
      notifySms?: number[];
    };
  };
  // extra?: any;
  // custom?: any;
  // lang?: any;
}

export interface Metadata {
  updated: Updated;
  created: Created;
}

export interface Updated {
  userID: string;
  userName: string;
  time: any;
  timeString?: string;
}

export interface Created {
  userID: string;
  userName: string;
  time: any;
  timeString?: string;
}

export interface Status {
  id:
  | 'DRAFT'
  | 'LIVE'
  | 'REJECTED'
  | 'PENDING';
  label: string;
}

export const status: Status[] = [
  {
    id: 'DRAFT',
    label: 'Draft'
  },
  {
    id: 'LIVE',
    label: 'Live'
  },
  {
    id: 'REJECTED',
    label: 'Rejected'
  },
  {
    id: 'PENDING',
    label: 'Pending'
  }
];

interface IDLabelModule {
  id: string;
  label: string;
  module: string;
}

export interface ImgUploadType {
  fileData?: File;     // Image File object
  fileName?: string;   // File name
  imgPath?: string;   // Image path
  imgUrl?: string | ArrayBuffer; // Image URL
  imgID?: string;  // Image ID

  //For cloudinary
  publicID?: string;
  version?: number;
};

export interface MultiImgUploadType {
  fileData?: File;
  fileName?: string;
  imgPath?: string;
  imgUrl?: string | ArrayBuffer | File;
  imgID?: string;
  isNewImg?: boolean;

  //For cloudinary
  publicID?: string;
  version?: number;
  image?: any;
}


type exceptionControl = Status | IDLabelModule | IDLabel | IDLabel[];

export type ControlOf<T extends Record<string, any>> = {
  [K in keyof T]:
  T[K] extends Array<infer Item>  ? FormArray<T[K]>:
  T[K] extends exceptionControl ? FormControl<T[K]> :
  T[K] extends Record<string, any>?
  FormGroup<ControlOf<T[K]>> :
  FormControl<T[K]>
}

type formType = ControlOf<Outlet>;

export interface Feature {
  booking: IDLabel | null;
}

interface IDLabel {
  id: string;
  label: string;
}


// this.docForm = this._fb.group({
//   isActive: true,
//   sort: null,
//   metadata: null,
//   name: ['', ],
//   machineCode: ['',
//     [Validators.required, Validators.pattern('^[a-zA-Z0-9_]*$'), Validators.maxLength(10), Validators.minLength(2)],
//     [checkMacCodeExists]
//   ],
//   internalName: ['', Validators.required],
//   status: {
//     id: 'DRAFT',
//     label: 'Draft'
//   },
//   bizType: ['', Validators.required],
//   zone: ['', Validators.required],
//   outletUrlId: ['', Validators.pattern('^[a-zA-Z0-9-]*$')],
//   features: this._fb.group({}),
//   franchise: '',
//   tax: '',
//   location: this._fb.group({
//     address: ['', Validators.required],
//     zip: '',
//     lat: [null, Validators.required],
//     long: [null, Validators.required],
//   }),
//   display: this._fb.group({
//     subtitle: '',
//     video: '',
//     outColor: '',
//     mobileBanner: '',
//     webBanner: '',
//     logo: '',
//     gallery: '',
//   }),
//   config: this._fb.group({
//     outcategory: null,
//     outTag: null,
//     outFeatList: null,
//     preTime: null,
//   }),
//   override: this._fb.group({
//     isPayment: false,
//     isOpHours: false,
//     isCommission: false,
//     isServiceArea: false,
//     isTimeSlot: false,
//     isSubscripSetting: false,
//     isTax: false,
//   }),
//   communication: this._fb.group({
//     display: this._fb.group({
//       phone: null,
//     }),
//     notify: this._fb.group({
//       callAdmin: null,
//       callManager: null,
//       notifyWhatsapp: null,
//       notifyEmail: null,
//       notifysms: null,
//     }),
//   }),
//   extra: null,
//   custom: null,
//   lang: null
// });
