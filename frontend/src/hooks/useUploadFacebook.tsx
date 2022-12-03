import { useEffect, useState } from 'react';
import { useAppSelector } from 'redux/hooks';
import {
    useUnpublishPhotoMutation,
    usePublishPhotosMutation,
} from 'services/facebookAPI';
import { formatNumber, getAverage } from 'utils/calculate';

const formatPost = (
    {
        content,
        hashtags,
        ratings_space,
        ratings_food,
        ratings_hygiene,
        ratings_service,
        ratings_price,
        is_recommend,
        total_bill,
        total_people,
    }: IPostFormInput,
    { address, time, priceRange }: IRestaurantDetail
) => {
    let message = `📍 ${address}\n⏰ ${time}\n💰 ${priceRange}`;
    message += `\n\n${content}`;
    message += `\n\n⭐ ${getAverage([
        ratings_space,
        ratings_food,
        ratings_hygiene,
        ratings_service,
        ratings_price,
    ])}`;
    message += `\n🧾 ${formatNumber(total_bill / total_people)} VND / 1 person`;
    message += is_recommend ? '\n✅ Recommend' : '\n❎ Do not recommend';
    message += `\n\n${hashtags.map((hashtag) => `#${hashtag}`).join(' ')}`;
    return message;
};

const useUploadFacebook = (
    post: IPostFormInput,
    images: string[],
    isReady: boolean
) => {
    const restaurant = useAppSelector((state) => state.restaurant.restaurant);

    const [unpublishPhoto] = useUnpublishPhotoMutation();
    const [publishPhotos] = usePublishPhotosMutation();

    const message = formatPost(post, restaurant);
    const [attachedMedias, setAttachedMedias] = useState<any>({});
    const [isDone, setIsDone] = useState<boolean>(false);

    useEffect(() => {
        if (isReady) {
            images.forEach((image, index) => {
                unpublishPhoto({ url: image, published: false })
                    .unwrap()
                    .then(({ id: media_fbid }: IUnpublishPhotoResponse) => {
                        setAttachedMedias((medias: any) => ({
                            [`attached_media[${index}]`]: JSON.stringify({
                                media_fbid,
                            }),
                            ...medias,
                        }));
                    });
            });
        }
    }, [isReady]);

    useEffect(() => {
        if (
            Object.keys(attachedMedias).length === images.length &&
            images.length > 0
        ) {
            publishPhotos({ ...attachedMedias, message })
                .unwrap()
                .then(({ id }: IUnpublishPhotoResponse) => {
                    setIsDone(true);
                    window.open(`https://www.facebook.com/${id}`, '_blank');
                });
        }
    }, [attachedMedias]);

    return isReady ? isDone : false;
};

export default useUploadFacebook;
