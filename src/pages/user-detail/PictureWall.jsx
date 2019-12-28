import React from 'react'
import PropTypes from 'prop-types'
import { Upload, Icon, Modal,message } from 'antd';
import {reqDeleteProductImage} from '../../api/index'



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


    static propTypes = {
        images : PropTypes.string.isRequired
    }

//只渲染了一次
     constructor(props){
         super(props)
         let fileList = []
         const image = this.props.images
         const images = image.split(",")

         if(images && images.length > 0){
             fileList = images.map((file, index) => ({
                 uid: -index, // 每个file都有自己唯一的id
                 status: 'done', // 图片状态: done-已上传, uploading: 正在上传中, removed: 已删除
                 url:  file
             })
         )
         }
         this.state={
             previewVisible: false,
             previewImage: '',
             fileList,
         }
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

    sendFileList = (fileList) => {
        this.props.PictureWall(fileList)
    }

    componentWillMount(){
        this.sendFileList(this.state.fileList)
    }

    /*
    file:当前操作的图片文件
    fileList:所有已上传图片文件对象的数组
     */

    handleChange =  async ({ fileList,file }) => {

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
        }/*else if(file.status==='removed'){
            const result = await reqDeleteProductImage(name)
            if(result.status===0){
                message.success('删除成功')
            }else{
                message.error('删除失败')
            }
        }*/
        this.setState({
            fileList
        },() => {
            this.sendFileList(this.state.fileList)
        });
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
                    {fileList.length >= 4 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}

