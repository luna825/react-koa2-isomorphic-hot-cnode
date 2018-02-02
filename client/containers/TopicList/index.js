import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import queryString from 'query-string'
import {load as loadTopics} from '../../redux/modules/topics'

//antd 组件
import {Card, List, Avatar, Row, Col, Tag } from 'antd'
import {CheckedTags} from '../../components'
import style from './index.scss'
const tabs = {
  all: "全部",
  good: "精华",
  share: "分享",
  ask: "问答"
}

@connect(state => ({topics: state.topics}), {loadTopics})
export default class TopicList extends Component {
  constructor(props) {
    super(props)
    this.fetchTopic = this.fetchTopic.bind(this)
  }

  static propTypes = {
    topics: PropTypes.object.isRequired,
    loadTopics: PropTypes.func.isRequired
  }
  componentDidMount() {
    this.props.loadTopics(this.fetchTopic())
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.location.search !== this.props.location.search){
      this.props.loadTopics(this.fetchTopic(nextProps.location))
    }
  }

  fetchTopic(location){
    location  = location ||  this.props.location
    const query = queryString.parse(location.search)
    const tab = query.tab
    return tab || 'all'
  }

  render() {
    const {loadTopics, topics, } = this.props
    return (
      <Card type='inner'
        title={<CheckedTags tabs={tabs} currentTab={this.fetchTopic()} />}
      >
        <List
          loading={topics.loading}
          dataSource={topics.loaded && topics.data.data}
          itemLayout="horizontal"
          className={style.topics}
          renderItem={item=>(
            <List.Item className={style.list}>
              <div className={style.avatar}><Avatar src={item.author.avatar_url} /></div>
              <div className={style.replyCount}>{item.reply_count}/{item.visit_count}</div>
              {this.fetchTopic() === 'all' &&
                <div className={style.tab}><Tag>{tabs[item.tab]}</Tag></div>
              }
              <div className={style.title}>{item.title}</div>
              <div className={style.lastTime}>{item.last_reply_at}</div>
            </List.Item>
          )}
        />
      </Card>
    )
  }
}

/*
// id:"5a54a8a4afa0a121784a8ab0"
// author_id:"54009f5ccd66f2eb37190485"
// tab:"share"
// content:"<div class="markdown-text"><p>很抱歉在首届蚂蚁体验科技 SEE Conf 大会上，给大家讲得有点磕绊不太清楚。今天写下来行诸文字，希望一些思考能与大家进一步交流。（设计师朋友可以跳过前端技术部分，直接看后面章节）</p> <h2>什么是前端技术</h2> <p>第一次接触前端开发是 2002 年大学期间，转眼 15 年多。这些年一直在思考一个问题：究竟什么是前端技术？很长很长一段时间，前端技术的定义非常清晰，就是浏览器端的 HTML、CSS、JS 技术。我们用这些技术做出各种各样的页面，我们是离用户最近的程序员。</p> <p><img src="//dn-cnode.qbox.me/FuTZzCUKkL_OGOsmrXbXvcqalO-D" alt="v2-356e4bb976792ec0c2ae166405e4b502_hd.jpg"></p> <p>记得 2009 年开始接触 Node，很快前端技术开始爆炸性增长。最开始的变化，是前端压缩工具从基于 Java 的 YUI Compressor 开始切换到基于 Node 实现的 UglifyJS 等工具。除了前端工具上的一路狂奔，在服务端领域也出现了 Express 等框架，前端开始通过 Node 完成服务端模板甚至整个 MVC 层的开发。在蚂蚁金服，服务端层我们更多把 Node 定位为 BFF 层实现，BFF 是 Backend For Frontend 的缩写，翻译成用户体验适配层。</p> <p>BFF 模式下，整体分工很清晰，后端通过 Java 等语言负责服务实现，理想情况下给前端提供的是基于领域模型的 RPC 接口，前端则在 BFF 层直接调用服务端 RPC 接口拿到数据，按需加工消费数据，并实现人机交互。基于 BFF 模式的研发，很适合拥有前端技术背景的全栈型工程师。这种模式的好处很明显，后端可以专注于业务领域，更多从领域模型的视角去思考问题，页面视角的数据则交给前端型全栈工程师去搞定。领域模型与页面数据是两种思维模式，通过 BFF 可以很好地解耦开，让彼此更专业高效。</p> <p>除了服务端的渗透，从 2013 年开始，阿里开始无线 ALL IN 战略，这对前端影响非常大。有相当多的前端开始转型为 iOS 工程师（转型为 Android 的比较少，有部分 Java 工程师转型成了 Android 开发），没有转型的，也开始大量投入到 Mobile Web 开发。这个大背景下，前端与客户端技术开始互相融合，特别是在容器层。从 2015 年开始，物联网 IoT 逐步兴起，前端开始涉足 IoT 设备上的应用研发。端的本质是 devices，台式机、手机、IoT 设备都是一台台 devices，很多会直接被用户使用，有用户使用的 devices，就会有人机交互需求，就会有前端的工作价值。前端是离用户最近的工程师，这个定位一直没变。</p> <p>非常有意思的是，在移动端的架构里，这几年也出现了基于 RPC 接口 + 网关 + BFF 的架构体系，在研发效率、网络性能等方面均有优势。随着 IoT 应用的涌现与复杂化，我相信最终也会出现 BFF 架构。BFF 模式不仅仅是一种技术架构，从社会分工角度讲，BFF 更是一种多元价值导向的分层架构，每一层都有不错的空间去施展，不仅能发挥工业社会双手的作用，还能使用上双手上面的脑袋。齿轮不再是被动跟着转，而是开始拥有自驱的转动力。同一时期，业界也出现了一些类似的职业融合。比如 DevOps 倡导开发也懂运维，不少大公司在推行开发也懂测试，测试则转型为更专业的质量工具部门，还有前端也懂设计的 DesignOps 的出现等等。各种全栈概念的涌现，都是在重新探索更合理的分层协作模式。纷纷扰扰，成败如风。</p> <p>补充一个说明，当年提出的前后端分离，并不准确，这些年一直努力纠正为前后端分层的理念。专业的分工协同对效能的提升很关键。全栈的含义是指分层演化后，每一层的技术栈要求，是每一层横向技能的全，而不是纵向跨层的通（纵向跨多层都能通的人才非常少，就如当今社会已经非常难诞生博物学家了）。不断探索更好的分层协作是有意思的，这就如人类家庭里夫妻的关系一样，男权、女权都不可取，社会的演化最终会视人为人，每个个体平等、自由，社会会以一种必然的不可阻挡的形态往前演进。</p> <p>回到前端发展历史，前面说了这么多，只说了一件事，前后端分层协作的各种模式。协作的边界是数据，后端提供数据服务接口，前端消费数据实现人机交互。不同模式下，BaaS（Backend as a Service）的含义各有不同。在 BFF 模式下，由于 BFF 层的运维部署需要，前端还需负责 BFF 层的 PaaS 平台建设。不同模式下的工程体系各有不同，工程的本质是让一群人做好一堆事，涉及代码规范、协作流程、运维部署、性能与安全等很多领域，这里不再一一展开。</p> <p>服务端 Node 与各种终端的涌现，让前端进入了大前端范畴，这时候的前端，已远远不只是浏览器端的页面实现技术，而是后端服务与人机界面的连接器。</p> <p><img src="//dn-cnode.qbox.me/Fgj5HsTiql9rambFQbhDg8t49tw3" alt="v2-374230208f31483237155e80d46f1c0d_hd.jpg"></p> <h2>什么是体验科技</h2> <p>我属于无线 ALL IN 战略中，选择留下来继续做 PC Web 的前端。虽然公司重点转向无线，但 PC 业务一直没停。随着近几年整个阿里集团“大中台、小前台”的策略，越来越多的企业级中后台产品处于兵荒马乱阶段，设计师非常缺失，随手一抓，都是大量体验比较糟心的产品。这过程中，越来越感觉什么地方有问题，一定在某些点上我们没做好。当时没多想，就想着既然缺设计师，我们就尝试去招聘。于是体验技术部开始拥有了设计师，非常艰辛的起步，非常感激的是，虽然艰辛，但找到了一些与我一样坚信中后台产品价值的设计师。一旦有了设计师，整个中后台产品的用户体验，一下子就提升上来了。</p> <p><img src="//dn-cnode.qbox.me/FvNAdF0m7cCZlevYQDFThuRYxvbz" alt="v2-54abf60cd133916e016343ae4adaf376_hd.jpg"></p> <p>设计团队的融入，日常的各种碰撞交流，让我的思维发生了很大变化。前端技术再牛，都很难直接解决产品层的用户体验。对中后台产品来说，设计的价值也远远不止于让产品的颜值提升，设计的更多更多价值，在于深入到产品的业务逻辑里去，去帮助业务梳理产品信息架构与任务流程。用户体验是一个非常综合的事，需要各种专业人士在同一个产品上聚焦发力，一起共同努力才能真正提升产品体验。设计师在这个过程中很痛苦，很多中后台产品都是非常垂直领域的业务产品，中间件、ECS、ODPS 等一堆堆专业术语让设计师们痛苦不堪，幸运的是，我们扛了过来。</p> <p><img src="//dn-cnode.qbox.me/Fk5n__QHurYmZawYh6-UXJ5Ox0Tv" alt="v2-9b693a1affab86f96e24e0bee03b3e90_hd.jpg"></p> <p>接下来的故事，在今天各个讲师的分享里，不少都有提及。整个团队的重心，开始非常清晰地往几个方向发展：</p> <ul> <li>TWA 方向：这是比 BFF 更大的概念，上午不四的分享里有详细阐述，可参考 知乎专栏文章 。TWA 是 Techless Web App 的缩写，是一种技术理念，希望越来越多的开发者，可以不用再关注流程、构建、环境、部署等各种事，希望能做到技术无感化（Techless），让每一位开发着能安安静静的快乐编码。</li> <li>UI 智能化方向：Ant Design 是一个设计体系，antd 是 Ant Design 的 React 实现。这几年 antd 的发展，不仅让前端编码更快更爽了，同时让一个历史悠久但生生不息的领域重燃希望：是否存在人机交互界面智能可视化搭建的可能？这个领域，这一两年在阿里内部非常火，各种搭建产品层出不穷，目前都还处于比较垂直的领域，泛化到行业级通用的产品还没怎么出现。我们也开始尝试，而且我们相信天时地利人和，一定能折腾出点什么，正在努力中，或许在下次 SEE Conf 大会中会展示给大家。</li> <li>数据可视化方向：下午绝云和御术的分享，相信大家对 G2 和 AntV 已经有了一个整体了解。可视化方向我们是从 2014 年开始正式投入人员去做，最开始的想法来自科幻片，大家如果喜欢看科幻片的话，会留意到各种人机交互界面都是各种可视化效果了，很少很少有传统网页。可视化是个历史非常悠久的领域，我们小学时学会的乘法竖式，就是一种可视化，可以帮助我们减少记忆成本，同时提升计算速度。</li> <li>图形互动化方向： 上午好修和景夫有分享，这一块才开始一年多，是我们非常笃定的一个方向。很多小孩，对书本都比较抗拒，但对游戏有着天生的喜爱。蚂蚁森林让大家从表单形式的公益，变成了互动游戏型的公益。越来越多的人机交互形式，会是有互动交互的图形界面。应用的泛互动化，是一个很大趋势。支付宝是个生活服务平台，各种生活服务的互动有趣化，一定是更有吸引力的。</li> </ul> <p><img src="//dn-cnode.qbox.me/Fui53ymFhJc0JS0IA0ZXqUvBNFiQ" alt="v2-6830ebf2ca603dca8bd33723d73220e3_hd.jpg"></p> <p>看更远的未来，我相信对体验科技来说，自然化和虚拟化会是两个大趋势。</p> <p>我现在在分享这个 PPT，要翻页时，需要点击键盘按钮，为什么电脑不能直接理解我的意图而自动翻页呢？比如我只要头往下示意一下，就能自然而然翻到下一页。我们现在很多行为，跳脱出来看，能发现很多很多不自然。天猫精灵等各种智能音箱，真正去用时，离自然交互还有比较远的距离。Ant Design 设计价值观里，最最重要的就是自然价值观，一切才刚刚开始探索。</p> <p>再说虚拟化。虚拟化不仅仅指 AR、VR 等技术，看过黑客帝国、西部世界等科幻片的，会对虚拟化有更多体感。如果以后每个小孩出生时，就会被植入一个能五感俱全的芯片，这种情况下，我们的人机交互会是怎么样的。太多可能性与挑战在等着我们。</p> <p>这一切都是体验科技，是技术与设计的融合，是服务与用户连接，是下图中的一个公式。</p> <p><img src="//dn-cnode.qbox.me/Fh5rgc3RVIRYuQYZSXMdKlBKlfnB" alt="v2-773def061a6dd38cd97c52f040da29cc_hd.jpg"></p> <p><img src="//dn-cnode.qbox.me/FpueJ6H7sBiB7kVsLORMYQpjDClK" alt="v2-e4186cd37a1f978abbf64970dee50ba9_hd.jpg"></p> <p>体验科技是 UX = f(services) 这个公式，能将各种各种的 services（后端服务） 通过技术与设计的融合，转变成体验一流的用户产品。这个公式的一个实现，就是蚂蚁体验云。蚂蚁体验云的初心，是希望能帮助有梦想的你，将一个个优秀的想法，通过体验云实现成一个个终端产品。 <img src="//dn-cnode.qbox.me/FjtnnNqNeyh5rH4MTreunWUgsNgj" alt="v2-ab3eae986630f436d1c6b751f4a8d895_hd.jpg"></p> <p>体验云才刚刚起步，目前已在内部服务蚂蚁金服、阿里巴巴集团，同时快速孵化出了云凤蝶、语雀、小钱袋等创新产品。虽然还很不完善，但我们希望能尽快与用户一起成长。很多激动人心的事正在发生，通过体验科技的开放，我们希望着能为世界带来更多平等的机会。 <img src="//dn-cnode.qbox.me/FgGx0MFi9k0eJAeLX3icMz6YLD9v" alt="v2-98323a7d1c563df55151451066a7709e_hd.jpg"></p> <p>感谢聆听，期待交流。</p> <p>附 SEE Conf 演讲视频： <a href="http://v.youku.com/v_show/id_XMzMwMzg2MDIwOA==.html">优酷地址 </a></p> <p>最后，演讲 PPT 已精心整理并转换为 PDF 上传至<a href="http://yuque.com/seeconf"> SEE Conf 语雀在线知识库</a>，欢迎下载（请 注册语雀，个人描述内注明 #知乎seeconf# 便可快速申请邀请码，登录后即可下载）</p> </div>"
// title:"玉伯《从前端技术到体验科技（附演讲视频）》"
// last_reply_at:"2018-02-02T08:37:46.537Z"
// good:false
// top:true
// reply_count:22
// visit_count:7430
// create_at:"2018-01-09T11:33:56.183Z" */
