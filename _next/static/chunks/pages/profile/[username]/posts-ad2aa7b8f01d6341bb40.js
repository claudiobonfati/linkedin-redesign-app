_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[33],{"20a2":function(e,t,a){e.exports=a("nOHt")},"TFC+":function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/profile/[username]/posts",function(){return a("spXv")}])},"YrN+":function(e,t,a){"use strict";var s=a("nKUr"),r=(a("q1tI"),a("wAqU")),n=a.n(r),i=function(e){return Object(s.jsx)("div",{className:n.a.wrapper,style:{backgroundImage:"url(".concat("/linkedin-redesign-app","/images/no-result-found.svg)")},children:Object(s.jsxs)("p",{className:"text-center",children:[e.title,e.subtitle&&Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("br",{}),e.subtitle]})]})})};i.defaultProps={title:"Nothing found. =/"},t.a=i},spXv:function(e,t,a){"use strict";a.r(t);var s=a("nKUr"),r=a("o0o1"),n=a.n(r),i=a("HaE+"),o=a("1OyB"),c=a("vuIU"),l=a("JX7q"),u=a("Ji7U"),d=a("md7G"),h=a("foSv"),f=a("q1tI"),p=a.n(f),m=a("uuth"),j=a("20a2"),b=a("ATyU"),v=a("xEQ+"),O=a.n(v),g=a("YrN+"),x=a("jJ+3"),y=a("XWzK"),k=a("6fZt"),w=a("zdLN"),P=a("Q+mk"),N=a("HKcl"),U=a("dZBf");function _(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,s=Object(h.a)(e);if(t){var r=Object(h.a)(this).constructor;a=Reflect.construct(s,arguments,r)}else a=s.apply(this,arguments);return Object(d.a)(this,a)}}var E=function(e){Object(u.a)(a,e);var t=_(a);function a(e){var s;return Object(o.a)(this,a),(s=t.call(this,e)).state={feedPage:0,feedPerPage:5,feedEnded:!1,feed:{loading:!1,error:!1,data:null},user:null,similarProfiles:[]},s.fetchPosts=s.fetchPosts.bind(Object(l.a)(s)),s}return Object(c.a)(a,[{key:"componentDidMount",value:function(){var e=Object(i.a)(n.a.mark((function e(){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:window.scrollTo(0,0),this.props.router.query.username&&this.getInitialPosts(),this.fetchSimilarProfiles();case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentDidUpdate",value:function(e){this.props.router.query.username!==e.router.query.username&&void 0!==this.props.router.query.username&&this.getInitialPosts()}},{key:"fetchSimilarProfiles",value:function(){var e=Object(i.a)(n.a.mark((function e(){var t,a,s;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(P.g)(4,["".concat((null===(t=this.state.user)||void 0===t||null===(a=t.data)||void 0===a?void 0:a.id)||null),"1"]);case 3:s=e.sent,this.setState((function(){return{similarProfiles:s}})),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,this,[[0,7]])})));return function(){return e.apply(this,arguments)}}()},{key:"getInitialPosts",value:function(){var e=Object(i.a)(n.a.mark((function e(){var t;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(P.h)(this.props.router.query.username);case 2:t=e.sent,this.setState({user:t}),this.fetchPosts();case 5:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"fetchPosts",value:function(){var e=Object(i.a)(n.a.mark((function e(){var t,a;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(P.e)(this.state.feedPage,this.state.feedPerPage,this.state.user.data.id);case 3:(t=e.sent).loading||t.error||(a=this.state.feed.data?this.state.feed.data:[],t.data&&0!==t.data.length?this.setState((function(e){return{feed:{loading:t.loading,error:t.error,data:a.concat(t.data)},feedPage:e.feedPage+1}})):this.setState({feed:{loading:t.loading,error:t.error,data:a.concat(t.data)},feedEnded:!0})),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,this,[[0,7]])})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t=Object(s.jsx)(x.a,{});if(this.state.feed.data&&Array.isArray(this.state.feed.data)){var a,r,n;if(this.state.feed.data.length>0)t=Object(s.jsx)(s.Fragment,{children:this.state.feed.data.map((function(t,a){return Object(s.jsxs)("div",{className:"mb-4",children:[Object(s.jsx)(k.a,{opPhoto:t.User?t.User.photo:t.Company.logo,opName:t.User?t.User.name:t.Company.name,opSubtitle:t.User?t.User.headline:null,opLink:"/profile/".concat(t.User.username,"/details"),postTime:t.time,postBody:t.body,postImage:t.image,postVimeo:t.video,postLikes:t.likes,postComments:t.Comments}),a===e.state.feed.data.length-1&&!e.state.feedEnded&&Object(s.jsx)(m.a,{onEnter:function(){return e.state.feedEnded?null:e.fetchPosts()}})]},t.id)}))});else t=Object(s.jsx)(g.a,{title:"It looks like ".concat((null===(a=this.state.user)||void 0===a||null===(r=a.data)||void 0===r||null===(n=r.name)||void 0===n?void 0:n.split(" ")[0])||"the profile"," didn't post anything yet.")});console.log("here?")}var i=Object(s.jsx)(x.a,{});return this.state.similarProfiles&&Array.isArray(this.state.similarProfiles)&&this.state.similarProfiles.length>0&&(i=Object(s.jsx)(s.Fragment,{children:this.state.similarProfiles.map((function(t,a){return Object(s.jsx)("div",{className:"".concat(a+1===e.state.similarProfiles.length?"":"pb-3"),children:Object(s.jsx)(N.a,{image:t.photo,imageSize:50,title:t.name,subtitle:t.headline,link:"/profile/".concat(t.username,"/details"),imageOnTop:!0})},t.id)}))})),Object(s.jsx)(b.a.div,{className:"w-100",variants:U.a,initial:"initial",animate:"animate",exit:"exit",children:Object(s.jsx)("div",{className:"container",children:Object(s.jsxs)("main",{className:"row",children:[Object(s.jsx)("div",{className:"col-lg-3 col-md-4 d-none d-md-block",children:Object(s.jsxs)("div",{className:"sticky-aside-content",children:[this.state.user&&!this.state.user.error&&this.state.user.loading&&Object(s.jsx)(x.a,{}),this.state.user&&!this.state.user.error&&!this.state.user.loading&&Object(s.jsx)(O.a,{topOffset:-20,scrollElement:".stickyArea",children:Object(s.jsx)(y.a,{pro:this.state.user.data.pro,photo:this.state.user.data.photo,name:this.state.user.data.name,position:this.state.user.data.headline,connections:this.state.user.data.connections,email:this.state.user.data.email,twitter:this.state.user.data.twitter,skype:this.state.user.data.skype})})]})}),Object(s.jsx)("div",{className:"col-lg-6 col-md-8 py-4",children:t}),Object(s.jsx)("div",{className:"col-lg-3 col-md-4 pt-4 d-none d-lg-block",children:Object(s.jsx)("div",{className:"sticky-aside-content",children:Object(s.jsx)(O.a,{topOffset:-20,scrollElement:".stickyArea",children:Object(s.jsx)(w.a,{title:"Similar profiles",children:Object(s.jsx)("div",{className:"w-100",children:i})})})})})]})})})}}]),a}(p.a.Component);t.default=Object(j.withRouter)(p.a.memo(E,(function(){return!0})))},wAqU:function(e,t,a){e.exports={wrapper:"NothingFound_wrapper__35NxW"}}},[["TFC+",0,2,1,3,5,4,7,8,9,10]]]);