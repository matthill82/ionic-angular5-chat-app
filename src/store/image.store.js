import {observable, action} from 'mobx';

class ImageStore {

    @observable isLoadingImage = false;
    @observable imageUrl = '';

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action addImageUrl(url) {
        this.imageUrl = url;
    }

}

export default ImageStore;