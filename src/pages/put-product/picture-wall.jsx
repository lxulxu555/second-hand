import React,{Component} from 'react'
import { Upload, Icon, Modal,message } from 'antd';



function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export class PictureWall extends React.Component {


    state = {
        previewVisible: false,
        previewImage: '',
        fileList : [],
    };


    //获取所有已上传图片文件名的数组
    GetImgs = () => {
        return this.state.fileList.map(Item => Item.url)
    }

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    /*
    file:当前操作的图片文件
    fileList:所有已上传图片文件对象的数组
     */
    handleChange =  ({ fileList,file }) => {

        //一旦上传成功，将当前上传的file的信息修正(name,url)
        if(file.status==='done') {
            const result = file.response
            if (result.url) {
                message.success('上传图片成功')
                const {name, url} = result
                file = fileList[fileList.length - 1]
                file.name = name
                file.url = url
            } else {
                message.error('上传图片失败')
            }
        }
       /* else if(file.status==='removed'){
            const result = await reqDeleteImage(file.name)
            if(result.status===0){
                message.success('删除成功')
            }else{
                message.error('删除失败')
            }
        }*/
        //在操作(上传/删除)过程中更新fileList状态
        this.setState({ fileList });
    }

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div>Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action="http://39.106.188.22:8800/api/goods/image"
                    listType="picture-card"
                    name='file'
                    accept='image/*'
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}

