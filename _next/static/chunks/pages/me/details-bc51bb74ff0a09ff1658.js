_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[27],{"3ENp":function(e,a,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/me/details",function(){return t("TNSG")}])},TNSG:function(e,a,t){"use strict";t.r(a);var i=t("nKUr"),c=t("q1tI"),n=t("ATyU"),s=t("xEQ+"),l=t.n(s),d=t("jJ+3"),o=t("zdLN"),r=t("eNs+"),m=t("Uabf"),j=t("ybN6"),b=t("HKcl"),h=t("YrN+"),x=t("Q+mk"),p=t("dZBf");a.default=function(){var e=Object(x.q)("claudiobonfati");return Object(c.useEffect)((function(){window.scrollTo(0,0)}),[]),Object(i.jsx)(n.a.div,{className:"w-100",variants:p.a,initial:"initial",animate:"animate",exit:"exit",children:Object(i.jsx)("div",{className:"container",children:Object(i.jsxs)("main",{className:"row",children:[Object(i.jsx)("div",{className:"col-lg-3 col-md-4 pt-4",children:Object(i.jsx)("div",{className:"sticky-aside-content",children:Object(i.jsx)(l.a,{topOffset:-20,scrollElement:".stickyArea",children:Object(i.jsx)(m.a,{})})})}),Object(i.jsxs)("div",{className:"col-lg-6 col-md-8 py-4",children:[e&&!e.error&&e.loading&&Object(i.jsx)(d.a,{}),e&&e.error&&!e.loading&&Object(i.jsx)("div",{className:"mb-4",children:Object(i.jsx)(h.a,{title:"Yikes... It looks like our server is not responding.",subtitle:"Relax, breath, and try reloading the page."})}),e&&e.data&&!e.error&&!e.loading&&Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("div",{className:"mb-4",children:Object(i.jsx)(o.a,{title:"Summary",children:Object(i.jsx)("p",{className:"m-0",children:e.data.summary})})}),e.data.Experiences&&e.data.Experiences.length>0&&Object(i.jsx)("div",{className:"mb-4",children:Object(i.jsx)(o.a,{title:"Experience",children:e.data.Experiences.map((function(a,t){return Object(i.jsxs)(c.Fragment,{children:[Object(i.jsx)("div",{className:"mb-2",children:Object(i.jsx)(b.a,{link:"/company/".concat(a.Company.nameslug,"/home"),image:a.Company.logo,imageSize:45,imageSide:"right",title:a.title,blueLine:a.Company.name,subtitle:a.period})}),Object(i.jsx)("div",{className:t+1!==e.data.Experiences.length?"mb-4":"",children:Object(i.jsx)("p",{children:a.description})})]},a.id)}))})}),e.data.Courses&&e.data.Courses.length>0&&Object(i.jsx)("div",{className:"mb-4",children:Object(i.jsx)(o.a,{title:"Education",children:e.data.Courses.map((function(a,t){return Object(i.jsxs)(c.Fragment,{children:[Object(i.jsx)("div",{className:"mb-2",children:Object(i.jsx)(b.a,{link:"/company/".concat(a.Company.nameslug,"/home"),image:a.Company.logo,imageSize:45,imageSide:"right",title:a.Company.name,blueLine:a.title,subtitle:a.period})}),Object(i.jsx)("div",{className:t+1!==e.data.Courses.length?"mb-4":"",children:Object(i.jsx)("p",{children:a.description})})]},a.id)}))})}),e.data.Recommendations&&e.data.Recommendations.length>0&&Object(i.jsx)("div",{className:"mb-4",children:Object(i.jsx)(o.a,{title:"Recommendations",children:e.data.Recommendations.map((function(a,t){return Object(i.jsxs)("div",{className:"p-3 border-gray bg-gray-lighter ".concat(t+1!==e.data.Recommendations.length?"mb-4":""),children:[Object(i.jsx)(b.a,{link:"/profile/".concat(a.Author.username,"/details"),image:a.Author.photo,imageSize:47,title:a.Author.name,subtitle:a.Author.headline}),Object(i.jsx)("p",{className:"pl-5 ml-3 mt-3 mb-0",children:a.description})]},a.id)}))})}),e.data.Follows&&e.data.Follows.length>0&&Object(i.jsx)("div",{children:Object(i.jsx)(o.a,{title:"Following",children:Object(i.jsx)("div",{className:"row",children:e.data.Follows.map((function(e){return Object(i.jsx)("div",{className:"col-lg-4 col-sm-4 col-6 mb-4",children:Object(i.jsx)(r.a,{image:e.Company.cover,title:e.Company.name,link:"/company/".concat(e.Company.nameslug,"/home")})},e.id)}))})})})]})]}),Object(i.jsx)("div",{className:"col-lg-3 col-md-4 py-4 d-none d-lg-block",children:Object(i.jsx)(o.a,{title:"My stats",children:Object(i.jsx)(j.a,{views:"653",visitors:"325"})})})]})})})}}},[["3ENp",0,2,12,13,1,3,5,4,6,7,15]]]);