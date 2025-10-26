import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import Button from 'flarum/common/components/Button';
import Modal from 'flarum/common/components/Modal';
import DiscussionPage from 'flarum/forum/components/DiscussionPage';

// 外链警告模态框组件
class LinkWarningModal extends Modal {
    oninit(vnode) {
        super.oninit(vnode);
        this.linkUrl = this.attrs.linkUrl;
        this.warningText = this.attrs.warningText;
    }

    title() {
        return app.translator.trans('wszdb-shareurl.forum.link_warning_title');
    }

    className() {
        return 'LinkWarningModal';
    }

    content() {
        return (
            <div className="Modal-body">
                <p>{this.warningText}</p>
                <div className="Modal-footer" style={{ justifyContent: 'flex-start', marginTop: '20px' }}>
                    <Button className="Button Button--primary" onclick={() => this.hide()}>
                        {app.translator.trans('wszdb-shareurl.forum.cancel_button')}
                    </Button>
                    <span style={{ margin: '0 20px' }}>&nbsp;</span>
                    <Button 
                        className="Button Button--primary" 
                        onclick={() => {
                            window.open(this.linkUrl, '_blank');
                            this.hide();
                        }}
                    >
                        {app.translator.trans('wszdb-shareurl.forum.confirm_button')}
                    </Button>
                </div>
            </div>
        );
    }
}

app.initializers.add('wszdb-shareurl', () => {
    // 添加外链警告功能，修复跳转问题
    extend(app, 'mount', () => {
        const handleLinkClick = (e) => {
            const target = e.target.closest('a');
            if (target && target.href) {
                const currentHost = window.location.hostname;
                const linkHost = new URL(target.href).hostname;
                
                // 检查是否为外链
                if (linkHost !== currentHost) {
                    const whitelist = app.forum.attribute('wszdb.shareurl.whitelist') || [];
                    const isWhitelisted = whitelist.some(keyword => 
                        target.href.includes(keyword.trim())
                    );
                    
                    if (!isWhitelisted) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        const warningText = app.forum.attribute('wszdb.shareurl.warningText') || 
                            app.translator.trans('wszdb-shareurl.forum.warning_message');
                        
                        // 显示Flarum风格的模态框
                        setTimeout(() => {
                            app.modal.show(LinkWarningModal, {
                                linkUrl: target.href,
                                warningText: warningText
                            });
                        }, 0);
                        
                        return false;
                    }
                }
            }
        };
        
        // 使用passive事件监听器提高性能
        document.body.addEventListener('click', handleLinkClick, { passive: false });
    });
    
    // 添加复制链接按钮到讨论页面，完全参考书签插件的方式
    extend(DiscussionPage.prototype, 'sidebarItems', function (items) {
        // 检查是否启用复制链接功能
        const enableCopyLink = app.forum.attribute('wszdb.shareurl.enableCopyLink');
        if (!enableCopyLink) return;
        
        // 参考书签插件的按钮实现方式，添加链接图标，使用次要按钮样式
        items.add('copyLink', Button.component({
            className: 'Button Button--secondary',
            icon: 'fas fa-link',
            onclick: () => copyDiscussionLink(this.discussion)
        }, app.translator.trans('wszdb-shareurl.forum.copy_link_button')), 10);
    });
});

// 复制讨论链接函数
function copyDiscussionLink(discussion) {
    const title = discussion.title();
    const url = window.location.href;
    const text = `${title}\n${url}`;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            // 使用简单的DOM操作显示提示，避免alert系统错误
            showCopySuccessMessage();
        }).catch(() => {
            fallbackCopyTextToClipboard(text);
        });
    } else {
        fallbackCopyTextToClipboard(text);
    }
}

// 显示复制成功消息，位置改为左下角
function showCopySuccessMessage() {
    const message = app.translator.trans('wszdb-shareurl.forum.copy_success');
    const alertDiv = document.createElement('div');
    alertDiv.className = 'Alert Alert--success';
    alertDiv.style.position = 'fixed';
    alertDiv.style.bottom = '20px';
    alertDiv.style.left = '20px';
    alertDiv.style.zIndex = '9999';
    
    // 添加链接图标，使用Unicode字符避免图标加载问题
    const icon = document.createElement('span');
    icon.innerHTML = '🔗 ';
    icon.style.marginRight = '8px';
    
    alertDiv.appendChild(icon);
    alertDiv.appendChild(document.createTextNode(message));
    
    document.body.appendChild(alertDiv);
    
    // 2秒后自动消失
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.parentNode.removeChild(alertDiv);
        }
    }, 2000);
}

// 备用复制方法
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccessMessage();
    } catch (err) {
        const errorMessage = app.translator.trans('wszdb-shareurl.forum.copy_failed');
        const alertDiv = document.createElement('div');
        alertDiv.className = 'Alert Alert--error';
        alertDiv.style.position = 'fixed';
        alertDiv.style.bottom = '20px';
        alertDiv.style.left = '20px';
        alertDiv.style.zIndex = '9999';
        alertDiv.textContent = errorMessage;
        
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.parentNode.removeChild(alertDiv);
            }
        }, 2000);
    }
    
    document.body.removeChild(textArea);
}