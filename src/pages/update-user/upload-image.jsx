/*
upload-image.jsx  ->  update-user.jsx  -> top-nav.jsx
BUG:用户更新头像，若不选择新的图像则会默认为空
 */

import React,{Component} from 'react'
import {Upload,Icon,message} from 'antd'
import memoryUtils from "../../utils/memoryUtils";

export default class App extends Component{



    state = {
        loading: false,
        imageUrl:memoryUtils.user.img, //存放图片地址
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
            if(result.url){
                message.success('上传图片成功')
                const {name} = result
                const url = result.url
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
        const uploadButton = memoryUtils.user.img? (
            <img src={memoryUtils.user.img} alt="avatar" style={{ width: '100%' }} />
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
                action= 'http://39.106.188.22:8800/api/upload/image'
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

