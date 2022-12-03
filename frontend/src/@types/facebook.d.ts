interface IUnpublishPhotoParams {
    published: boolean;
    url: string;
}

interface IUnpublishPhotoResponse {
    id: string;
}

interface IPublishPhotoResponse {
    id: string;
    post_supports_client_mutation_id: boolean;
}
