/*
upload-image.jsx  ->  update-user.jsx  -> top-nav.jsx
 */

import React,{Component} from 'react'
import {Upload,Icon,message} from 'antd'
import memoryUtils from "../../utils/memoryUtils";

export default class App extends Component{



    state = {
        loading: false,
        imageUrl:memoryUtils.user.user.img, //存放图片地址
       // imageUrl : ''
    };

    componentWillMount() {
        this.sendImageUrl(this.state.imageUrl)
    }


    //为了向父组件发送当前上传的头像地址
    sendImageUrl(url){
        this.props.callBack(url)
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            const result = info.file.response
            console.log(result)
            if(result.code === 0){
                message.success('上传图片成功')
                const name = result.data.thumbnailName
                const url = result.data.thumbnailUrl
                info.file.name = name
                info.file.url = url
                this.setState({
                    loading : false,
                    imageUrl: url
                },()=>{
                    this.sendImageUrl(url)
                });


            } else{
                message.error('上传图片失败')
            }
        }
    };

    //获取上传的图片
    // GetImgs = () => {
    //         return this.file
    // }

    render () {
        const uploadButton = memoryUtils.user.user.img? (
            <img src={memoryUtils.user.user.img} alt="avatar" style={{ width: '100%' }} />
        )
            :
            (
            <div>
            <Icon type={this.state.loading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">Upload</div>
        </div>
            )
        return (
            <Upload
                action= 'http://47.93.240.205:8800/api/upload/image'
                listType="picture-card"
                name="file"
                accept='image/*'
                className="avatar-uploader"
                showUploadList={false}
                onChange={this.handleChange}
            >
                {
                    this.state.imageUrl
                        ? <img src={this.state.imageUrl} alt="avatar" style={{ width: '100%' }} />
                        : uploadButton
                }
            </Upload>
        )
    }
}

