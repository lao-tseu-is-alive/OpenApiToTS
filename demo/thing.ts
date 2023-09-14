export type APISchemas = {
  Thing: {
    /*
     * cet Universally unique identifier (UUID) sera généré automatiquement pour vous
     * Format: uuid
     */
    id: string /*
     * FK sur la clé primaire du TypeThing de cet objet
     * Format: int32
     */
    type_id: number
    /* Format: text */
    name: string
    /* Format: text */
    description?: string
    /* Format: text */
    comment?: string
    /* Format: int32 */
    external_id?: number
    /* Format: text */
    external_ref?: string
    /* Format: date, */
    build_at?: string
    status?: APISchemas["ThingStatus"]
    /* Format: uuid, */
    contained_by?: string
    /* Format: int32 */
    contained_by_old?: number
    inactivated: boolean
    /* Format: date-time */
    inactivated_time?: string
    /* Format: int32 */
    inactivated_by?: number
    /* Format: text */
    inactivated_reason?: string
    validated?: boolean
    /* Format: date-time */
    validated_time?: string
    /* Format: int32 */
    validated_by?: number
    /* Format: int32 */
    managed_by?: number /*
     * date de création de cet enregistrement dans la base
     * Format: date-time
     */
    created_at?: string /*
     * identifiant de l'utilisateur ayant créé cet enregistrement
     * Format: int32
     */
    created_by: number /*
     * date de la dernière modication de cet enregistrement
     * Format: date-time
     */
    last_modified_at?: string /*
     * utilisateur ayant effectué la dernière modication de cet enregistrement
     * Format: int32
     */
    last_modified_by?: number
    /* cet enregisrement a été marqué comme effacé */
    deleted: boolean /*
     * date à laquelle cet enregisrement a été marqué comme effacé
     * Format: date-time
     */
    deleted_at?: string /*
     * utilisateur ayant demandé de marquer cet enregisrement comme effacé
     * Format: int32
     */
    deleted_by?: number
    /* permet de stocker des attributs complémentaires au format json */
    more_data?: {}
    /* Format: double */
    pos_x: number
    /* Format: double */
    pos_y: number
  }
  ThingList: {
    /* Format: uuid */
    id: string
    /* Format: int32 */
    type_id: number
    name: string
    description?: string
    /* Format: int32 */
    external_id?: number
    inactivated: boolean
    validated?: boolean
    status?: APISchemas["ThingStatus"]
    /* Format: int32 */
    created_by: number
    /* Format: date-time */
    created_at?: string
    /* Format: double */
    pos_x: number
    /* Format: double */
    pos_y: number
  }
  TypeThing: {
    /* Format: int32 */
    id: number
    /* Format: text */
    name: string
    /* Format: text */
    description?: string
    /* Format: text */
    comment?: string
    /* Format: int32 */
    external_id?: number
    /* Format: text */
    table_name?: string
    /* Format: text, */
    geometry_type?: string
    inactivated: boolean
    /* Format: date-time */
    inactivated_time?: string
    /* Format: int32 */
    inactivated_by?: number
    /* Format: text */
    inactivated_reason?: string
    /* Format: int32 */
    managed_by?: number
    /* Format: date-time */
    created_at?: string
    /* Format: int32 */
    created_by: number
    /* Format: date-time */
    last_modified_at?: string
    /* Format: int32 */
    last_modified_by?: number
    deleted: boolean
    /* Format: date-time */
    deleted_at?: string
    /* Format: int32 */
    deleted_by?: number
    more_data_schema?: {}
  }
  TypeThingList: {
    /* Format: int32 */
    id: number
    name: string
    /* Format: int32 */
    external_id?: number
    /* Format: date-time */
    created_at: string
    /* Format: text */
    table_name?: string
    /* Format: text, */
    geometry_type?: string
    inactivated: boolean
  }
  /* Format: public.thing_status_type */
  ThingStatus:
    | "Planifié"
    | "En Construction"
    | "Utilisé"
    | "Abandonné"
    | "Démoli"
  Error: {
    /* Format: int32 */
    code: number
    message: string
  }
}

export type APIEndpoints = {
  "/thing": {
    responses: {
      get: Array<APISchemas["ThingList"]>
      post: APISchemas["Thing"]
    }
    requests:
      | {
          method?: "get"
          query?: {
            /* Format: int32 */
            type?: number
            /* Format: int32 */
            created_by?: number
            inactivated?: boolean
            validated?: boolean
            /* Format: int32 */
            limit?: number
            /* Format: int32 */
            offset?: number
          }
        }
      | { method: "post"; body: APISchemas["Thing"] }
  }
  "/thing/by-external-id/{externalId}": {
    responses: { get: Array<APISchemas["ThingList"]> }
    requests: {
      method?: "get"
      query?: {
        /* Format: int32 */
        limit?: number
        /* Format: int32 */
        offset?: number
      }
      urlParams: {
        /* Format: int32 */
        externalId: number
      }
    }
  }
  "/thing/search": {
    responses: { get: Array<APISchemas["ThingList"]> }
    requests: {
      method?: "get"
      query?: {
        keywords?: string
        /* Format: int32 */
        type?: number
        /* Format: int32 */
        created_by?: number
        inactivated?: boolean
        validated?: boolean
        /* Format: int32 */
        limit?: number
        /* Format: int32 */
        offset?: number
      }
    }
  }
  "/thing/count": {
    responses: {
      /* Format: int32 */
      get: number
    }
    requests: {
      method?: "get"
      query?: {
        keywords?: string
        /* Format: int32 */
        type?: number
        /* Format: int32 */
        created_by?: number
        inactivated?: boolean
        validated?: boolean
      }
    }
  }
  "/thing/{thingId}": {
    responses: {
      get: APISchemas["Thing"]
      put: APISchemas["Thing"]
      delete: null
    }
    requests:
      | {
          method?: "get"
          urlParams: {
            /* Format: uuid */
            thingId: string
          }
        }
      | {
          method: "put"
          urlParams: {
            /* Format: uuid */
            thingId: string
          }
        }
      | {
          method: "delete"
          urlParams: {
            /* Format: uuid */
            thingId: string
          }
        }
  }
  "/types": {
    responses: {
      get: Array<APISchemas["TypeThingList"]>
      post: APISchemas["TypeThing"]
    }
    requests:
      | {
          method?: "get"
          query?: {
            keywords?: string
            /* Format: int32 */
            created_by?: number
            /* Format: int32 */
            external_id?: number
            inactivated?: boolean
            /* Format: int32 */
            limit?: number
            /* Format: int32 */
            offset?: number
          }
        }
      | { method: "post"; body: APISchemas["TypeThing"] }
  }
  "/types/{typeThingId}": {
    responses: {
      get: APISchemas["TypeThing"]
      put: APISchemas["TypeThing"]
      delete: null
    }
    requests:
      | {
          method?: "get"
          urlParams: {
            /* Format: int32 */
            typeThingId: number
          }
        }
      | {
          method: "put"
          urlParams: {
            /* Format: int32 */
            typeThingId: number
          }
        }
      | {
          method: "delete"
          urlParams: {
            /* Format: int32 */
            typeThingId: number
          }
        }
  }
  "/types/count": {
    responses: {
      /* Format: int32 */
      get: number
    }
    requests: {
      method?: "get"
      query?: {
        keywords?: string
        /* Format: int32 */
        created_by?: number
        inactivated?: boolean
      }
    }
  }
}

export type APIPaths = keyof APIEndpoints

export type APIRequests<T extends APIPaths> = APIEndpoints[T]["requests"]

export type APIMethods<T extends APIPaths> = NonNullable<
  APIRequests<T>["method"]
>

export type APIRequest<T extends APIPaths, M extends APIMethods<T>> = Omit<
  {
    [MM in APIMethods<T>]: APIRequests<T> & { method: MM }
  }[M],
  "method"
> & { method?: M }

type DefaultToGet<T extends string | undefined> = T extends string ? T : "get"

export type APIResponse<
  T extends APIPaths,
  M extends string | undefined,
> = DefaultToGet<M> extends keyof APIEndpoints[T]["responses"]
  ? APIEndpoints[T]["responses"][DefaultToGet<M>]
  : never
