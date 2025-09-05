export {};
declare global {
  type sampleType = string;
  type pn = 40;
  type kind = 0 | 1 | 2; // 0 for app click, 1 for beacon button, 3 for restricted area
  type kind60 = 1 | 2 | 3; // 1  2  3
  type area_kind = 1 | 2; // 1 for unauthorized, 2 for dangerous
  type area_name = string; // 구역명칭
  type b_date = any;
  type email = any;
  type phone_os = any;
  type phone = any;
  type mac_name = any;
  type battery = any;
  type gpsPoint = number;
  type site_idx = number | string;
  type uuid = any;
  type fcm_token = any;
  type record_time = number;
  type point = { x: number; y: number };
  type area_code = string;
  type status = string;
  type gpsState = {
    area_name: string;
    area_code: area_code;
    area_type: string;
  };
  type pn40record = {
    iw_idx: string;
    x: number;
    y: number;
    target_index: string;
    record_time: number;
    isAllow: boolean;
    status: string;
    site_idx: string;
  };
  type testConfig = {
    iw_idx: string;
    p0: {
      x: number;
      y: number;
    };
    p1: {
      x: number;
      y: number;
    };
    t_start: number;
    t_gap: number;
    count: number;
    site_idx: "sgj4";
  };
  type pointT = {
    x: number;
    y: number;
    record_time: number;
    area_code: area_code;
  };

  type stageUnitGps = pointT;

  type stageUnitGps2 = {
    x: number;
    y: number;
    record_time: number;
    target_index: string;
    isAllow: boolean;
    status: status;
  };

  interface req1 {
    pn: number;
    phone: string;
  }
  interface req10 {
    pn: number;
    key: string;
  }

  interface req11 {
    pn: number;
    key: string;
    name: string;
    b_date: string;
    phone: string;
    email: string;
  }
  interface req20 {
    pn: number;
    key: string;
    fcm_token: string;
    name: string;
    phone: string;
    phone_os: number;
  }
  interface req30 {
    pn: number;
    key: string;
    phone: string;
  }
  interface req31 {
    pn: number;
    key: string;
    site_idx: site_idx;
    uuid: string;
    mac_name: string;
    battery: string;
  }
  interface req40 {
    pn: number;
    key: string;
    site_idx: site_idx;
    iw_idx: string;
    lat: string;
    lng: string;
  }
  interface req50 {
    pn: number;
    key: string;
    site_idx: site_idx;
    iw_idx: number;
    kind: kind;
    uuid: string;
    mac_name: string;
    lat: string;
    lng: string;
  }
  interface req55 {
    pn: number;
    key: string;
    site_idx: site_idx;
    iw_idx: number;
  }
  interface req60 {
    pn: number;
    key: string;
    site_idx: site_idx;
    push_type: kind60;
    push_body: string;
    push_title: string;
    site_index?: string;
    wk_index: number;
    // area_kind: area_kind; // 1 for unauthorized, 2 for dangerous
    // area_name: number;
  }
  interface res1 {
    pn: number;
    resultCode: number;
    resultMsg: string;
    api_url: string;
    api_port: string;
  }
  interface res10 {
    pn: number;
    resultCode: number;
    resultMsg: string;
    details_1: string;
    details_2: string;
    details_3: string;
  }
  interface res11 {
    pn: number;
    resultCode: number;
    resultMsg: string;
  }
  interface res20 {
    pn: number;
    resultCode: number;
    resultMsg: string;
    uuid1: string;
    mac_name1: string;
    uuid2: string;
    mac_name2: string;
  }
  interface res30 {
    pn: number;
    resultCode: number;
    resultMsg: string;
    site_idx: site_idx;
    bs_name: string;
    bc_name: string;
    iw_idx: number;
    iw_name: string;
    iw_position: string;
    uuid1: string;
    mac_name1: string;
    uuid2: string;
    mac_name2: string;
  }
  interface res31 {
    pn: number;
    key: string;
    resultCode: number;
    resultMsg: string;
    site_idx: site_idx;
  }
  interface res40 {
    pn: number;
    resultCode: number;
    resultMsg: string;
    site_idx: site_idx;
    bs_name: string;
  }
  interface res50 {
    pn: number;
    resultCode: number;
    resultMsg: string;
  }
  interface res55 {
    pn: number;
    resultCode: number;
    resultMsg: string;
    records: any;
  }
  interface res60 {
    pn: number;
    resultCode: number;
    resultMsg: string;
    records: any;
  }

  interface gpsAppData {
    pn?: number;
    key?: string;
    site_idx: site_idx;
    iw_idx: number;
    x: number;
    y: number;
    record_time: record_time;
  }

  interface gpsAppData2 {
    iw_idx: string;
    x: number;
    y: number;
    target_index: string;
    record_time: record_time;
    isAllow: boolean;
    status: string;
  }

  interface gpsStages {
    staging: stageUnitGps[];
    commit: stageUnitGps[];
  }

  interface gpsStages2 {
    staging: stageUnitGps2[];
    commit: stageUnitGps2[];
  }

  type gpsCommits = stageUnitGps[][];
  type gpsCommits2 = stageUnitGps2[][];
  type pushloads = {
    timestamp_start: number;
    timestamp_end: number;
    logs: stageUnitGps2[][];
    phone: string;
  };

  interface gpsAppModel {
    iw_idx: number;
    site_idx: site_idx;
    values: stageUnitGps[];
    stages: gpsStages;
    commits: gpsCommits;
  }

  interface gpsAppModel2 {
    iw_idx: string;
    stages: gpsStages2;
    commits: gpsCommits2;
    pushloads: pushloads[];
  }

  interface gpsDeviceData {
    site: number;
    device: number;
    en_gps: number;
    lat: number;
    lng: number;
    ns: string;
    ew: string;
    sp_knots: number;
    sp_ms: number;
  }

  interface area {
    area_name: string;
    area_code: string; // sdi_안전
    area_type: string; // 안전 위험 경고 ...등등
    points: point[];
  }

  interface GpsLog extends pointT {
    iw_idx: number;
  }

  interface GpsAlarm {
    area_code: area_code;
    iw_idx: number;
    record_start: number;
    record_end: number;
    startPoint: string;
    endPoint: string;
  }

  interface area_info {
    type: string;
    coordinate: string;
    options: {
      strokeColor: string;
      strokeWeight: number;
      strokeStyle: string;
      strokeOpacity: number;
    };
  }

  interface group_info {
    status?: string;
    map_level: number;
  }

  interface kakaoArea extends area_info {
    points: point[];
  }

  // interface infoGps {
  //   target_id?: number;
  //   site_index: string;
  //   target_name: string;
  //   target_type: "group" | "area" | "object";
  //   // 타입 세부정의 필요
  //   target_info: {
  //     types: { group_type: string; area_type?: string; object_type?: string };
  //     points: json;
  //     group_info?: group_info;
  //     area_info?: area_info;
  //     object_info?: object_info;
  //   };
  // }

  type draw_type =
    | "polygon"
    | "polyline"
    | "rectangle"
    | "marker"
    | "circle"
    | "map"
    | "arrow";
  type object_type = "area" | "object"; // object ( cctv, gas 등.. )   , 필요한경우 object 를 cctv, gas 등으로 세분화;
  type area_status = "safe" | "warning" | "danger";
  type drawOptions = {
    strokeColor?: string;
    strokeWeight?: number;
    strokeStyle?: string;
    strokeOpacity?: number;
    endArrow?: boolean;
    fillColor?: string;
    fillOpacity?: number;
  };

  type draw_info = {
    type: draw_type;
    idx?: number;
    x?: number;
    y?: number;
    coordinate?: string;
    zIndex?: number;
    content?: string;
    options?: drawOptions;
    points?: point[];
    sPoint?: point;
    ePoint?: point;
    center?: point;
    radius?: number;
  };

  interface infoGps {
    target_index: string;
    target_name: string;
    site_index: string;
    draw_info: draw_info;
    object_info: {
      type: object_type;
      group?: string; //
      image?: string;
      status?: string;
      allow_list?: string[]; // 인가자 리스트
    };
    timestamp?: number;
  }

  interface infoMap {
    map_index: number;
    map_level?: number;
    max_level?: number;
    view_mode?: number;
    position_name?: string;
    point?: any;
    site_index?: string;
    drawInfos: draw_info[];
  }

  interface info_vehicle {
    vh_id: number;
    vh_index: string;
    wk_index?: string;
    wk_name?: string;
    created_date: string;
    modified_date: string | null;
    vh_name: string;
    vh_number: string;
    vh_image: string | null;
    vh_io_state: string;
    vh_description: string | null;
    co_id: number;
    bc_index: string;
    bc2_index: string;
    vh_driver: string;
    vh_phone: string;
    vh_birth: string;
    phone_os: string | null;
    fcm_token: string | null;
  }

  interface info_beacon {
    bc_id: number;
    bc_index: string;
    bc_management: number;
    created_date: string;
    modified_date: string | null;
    bc_address: string;
    bc_description: string | null;
    bc_used_type: number;
    bc_battery_remain: string;
    bc_battery_time: string;
    bc_scn_group: string;
    bc_scn_kind: number;
    bc_receive_time: string;
    bc_io_state: string;
    bc_input_time: string;
    bc_out_time: string;
    bc_pos_x: number;
    bc_sos_time: string;
    bc_emergency: number;
    bc_sos_action: number;
    ts_index: string;
    temp_out: string | null;
    bc_name: string | null;
    bc_uuid: string | null;
  }
  interface info_worker {
    wk_id: number;
    vh_index?: string;
    vh_driver?: string;
    wk_index: string;
    created_date: string;
    modified_date: string | null;
    wk_name: string;
    wk_phone: string;
    wk_tel: string | null;
    wk_position: string;
    wk_nation: string;
    wk_birth: string;
    wk_blood_type: number;
    wk_blood_group: number;
    wk_sms_yn: number;
    wk_image: string | null;
    wk_io_state: string;
    bc_index: string | null;
    bc2_index: string | null;
    co_id: number;
    phone_os: string | null;
    fcm_token: string | null;
  }

  interface common_info_worker {
    target_index: string;
    name: string;
    phone: string;
    site_index: string;
    info_detail: {
      bc_index: string;
      bc2_index: string;
      bc_address: string;
      bc2_address: string;
      bc_uuid: string;
      bc2_uuid: string;
      bc_name: string;
      bc2_name: string;
      worker_type: string;
      co_name: string;
      site_index: string;
      position: string;
    };
    timestamp?: number;
  }
}
