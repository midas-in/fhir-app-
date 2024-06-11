"use strict";(self.webpackChunkfhircore=self.webpackChunkfhircore||[]).push([[4101],{1954:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>h,frontMatter:()=>i,metadata:()=>d,toc:()=>o});var s=n(5893),r=n(1151);const i={},l="Resource closure using configured questionnaires",d={id:"engineering/android-app/configuring/event-management/resource-closure",title:"Resource closure using configured questionnaires",description:"Event management implementation provides the ability to configure a questionnaire so that we can state which resources to close when it is submitted.",source:"@site/docs/engineering/android-app/configuring/event-management/resource-closure.mdx",sourceDirName:"engineering/android-app/configuring/event-management",slug:"/engineering/android-app/configuring/event-management/resource-closure",permalink:"/engineering/android-app/configuring/event-management/resource-closure",draft:!1,unlisted:!1,editUrl:"https://github.com/opensrp/fhircore/tree/main/docs/engineering/android-app/configuring/event-management/resource-closure.mdx",tags:[],version:"current",frontMatter:{},sidebar:"defaultSidebar",previous:{title:"Resource closure using background workers",permalink:"/engineering/android-app/configuring/event-management/resource-closure-by-background-worker"},next:{title:"In-app reporting",permalink:"/engineering/android-app/configuring/in-app-reporting"}},c={},o=[{value:"Sample event workflow configuration",id:"sample-event-workflow-configuration",level:2},{value:"EventWorkflows properties",id:"eventworkflows-properties",level:2},{value:"Trigger condition properties",id:"trigger-condition-properties",level:3},{value:"Event Resource Properties",id:"event-resource-properties",level:3},{value:"DataQuery properties",id:"dataquery-properties",level:3},{value:"UpdateValue properties",id:"updatevalue-properties",level:3},{value:"Resource Filter Expression properties",id:"resource-filter-expression-properties",level:3}];function a(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{id:"resource-closure-using-configured-questionnaires",children:"Resource closure using configured questionnaires"}),"\n",(0,s.jsx)(t.p,{children:"Event management implementation provides the ability to configure a questionnaire so that we can state which resources to close when it is submitted."}),"\n",(0,s.jsx)(t.p,{children:"Some use cases would be -"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"Closing CarePlans and Tasks for a patient/family when they are removed."}),"\n",(0,s.jsx)(t.li,{children:"Closing child-related CarePlans and Tasks if a patient's age is updated to more than 5 years."}),"\n",(0,s.jsx)(t.li,{children:"Closing ANC CarePlan and Tasks when a pregnancy outcome form is submitted."}),"\n"]}),"\n",(0,s.jsxs)(t.p,{children:["This is achieved by use of the ",(0,s.jsx)(t.code,{children:"EventWorkFlow"})," config."]}),"\n",(0,s.jsx)(t.h2,{id:"sample-event-workflow-configuration",children:"Sample event workflow configuration"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-json",children:'\n{\n  "eventWorkflows": [\n    {\n      "eventType": "RESOURCE_CLOSURE",\n      "eventResources": [\n        {\n          "id": "sickChildConditionToBeClosed",\n          "resource": "Condition",\n          "configRules": [\n            {\n              "name": "patientId",\n              "condition": "true",\n              "actions": [\n                "data.put(\'patientId\', fhirPath.extractValue(CarePlan, \'CarePlan.subject.reference\'))"\n              ]\n            }\n          ],\n          "dataQueries": [\n            {\n              "paramName": "code",\n              "filterCriteria": [\n                {\n                  "dataType": "CODEABLECONCEPT",\n                  "value": {\n                    "system": "http://snomed.info/sct",\n                    "code": "275142008"\n                  }\n                }\n              ]\n            },\n            {\n              "paramName": "subject",\n              "filterCriteria": [\n                {\n                  "dataType": "REFERENCE",\n                  "computedRule": "patientId"\n                }\n              ]\n            }\n          ]\n        },\n        {\n          "id": "carePlanToBeClosed",\n          "resource": "CarePlan",\n          "configRules": [\n            {\n              "name": "patientId",\n              "condition": "true",\n              "actions": [\n                "data.put(\'patientId\', fhirPath.extractValue(Patient, \'Patient.id\').contains(\'Patient\') ? fhirPath.extractValue(Patient, \'Patient.id\') : \'Patient/\' +  fhirPath.extractValue(Patient, \'Patient.id\'))"\n              ]\n            }\n          ],\n          "dataQueries": [\n            {\n              "paramName": "instantiates-canonical",\n              "filterCriteria": [\n                {\n                  "dataType": "REFERENCE",\n                  "value": "PlanDefinition/dc-diabetes-screening-intervention"\n                }\n              ]\n            },\n            {\n              "paramName": "subject",\n              "filterCriteria": [\n                {\n                  "dataType": "REFERENCE",\n                  "computedRule": "patientId"\n                }\n              ]\n            }\n          ],\n          "relatedResources": [\n            {\n              "resource": "Task",\n              "searchParameter": "based-on"\n            }\n          ]\n        }\n      ],\n      "updateValues": [\n        {\n          "jsonPathExpression": "Task.status",\n          "value": "cancelled",\n          "resourceType": "Task"\n        },\n        {\n          "jsonPathExpression": "CarePlan.status",\n          "value": "completed",\n          "resourceType": "CarePlan"\n        },\n        {\n          "jsonPathExpression": "Condition.clinicalStatus.coding[0].code",\n          "value": "370996005",\n          "resourceType": "Condition"\n        },\n        {\n          "jsonPathExpression": "Condition.clinicalStatus.coding[0].system",\n          "value": "http://www.snomed.org/",\n          "resourceType": "Condition"\n        },\n        {\n          "jsonPathExpression": "Condition.clinicalStatus.coding[0].display",\n          "value": "resolved",\n          "resourceType": "Condition"\n        }\n      ],\n      "resourceFilterExpressions": [\n        {\n          "conditionalFhirPathExpressions": [\n            "Task.status != \'completed\'"\n          ],\n          "resourceType": "Task"\n        }\n      ]\n    }\n  ]\n}\n\n'})}),"\n",(0,s.jsxs)(t.p,{children:["The current implementation eventWorkflow config only handle closure of resources, hence the event type defaults to ",(0,s.jsx)(t.code,{children:"RESOURCE_CLOSURE"}),". This implementation can be expanded in future to handle other types of events."]}),"\n",(0,s.jsx)(t.p,{children:"The trigger conditions determine whether to close resources depending on the the result of evaluating the fhirpath expressions.\nThe fhirpath expressions can be run against"}),"\n",(0,s.jsxs)(t.ol,{children:["\n",(0,s.jsxs)(t.li,{children:["The subject of the questionnaire e.g ",(0,s.jsx)(t.code,{children:"Patient.active"})]}),"\n",(0,s.jsxs)(t.li,{children:["The Bundle resource which contains the ",(0,s.jsx)(t.code,{children:"QuestionnaireResponse"}),", the ",(0,s.jsx)(t.code,{children:"subject"})," as well as additional resources. An example expression would be ",(0,s.jsx)(t.code,{children:"%resource.entry.where(resource is QuestionnaireResponse).resource.where(questionnaire = 'Questionnaire/450cb100-0c5b-47c6-9f33-2830a79be726').exists()"})]}),"\n",(0,s.jsxs)(t.li,{children:["A combination of both the ",(0,s.jsx)(t.code,{children:"subject"})," and ",(0,s.jsx)(t.code,{children:"Bundle"})," e.g ",(0,s.jsx)(t.code,{children:"Patient.active AND %resource.entry.where(resource is QuestionnaireResponse).resource.where(questionnaire = 'Questionnaire/450cb100-0c5b-47c6-9f33-2830a79be726').exists()"})]}),"\n"]}),"\n",(0,s.jsx)(t.p,{children:"The event resources define which resource is eligible for closure as well as any related resources."}),"\n",(0,s.jsx)(t.p,{children:"The data queries define how to search for and filter the resources from the database."}),"\n",(0,s.jsx)(t.p,{children:"Once the resources have been retrieved from the database, the next step is to close the resources by updating the values of certain fields. For the current implementation this has been done in the code. This is not configurable at this point.\nClosure of any resource that has not been handled will need an update to the code that performs resource closure."}),"\n",(0,s.jsx)(t.p,{children:"The following table contains the values for each field that is required to close a resource.field"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Resource"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Field"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Value"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"Careplan"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"status"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"Completed"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"Task"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"status"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"cancelled"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"}}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"lastModified"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"current date"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"Condition"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"Condition.clinicalStatus"}),(0,s.jsxs)(t.td,{style:{textAlign:"left"},children:["code:370996005, display",":resolved",", system: ",(0,s.jsx)(t.a,{href:"http://www.snomed.org/",children:"http://www.snomed.org/"})]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"Procedure"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"Procedure.status"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"stopped"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"ServiceRequest"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"status"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"revoked"})]})]})]}),"\n",(0,s.jsx)(t.h2,{id:"eventworkflows-properties",children:"EventWorkflows properties"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Property"}),(0,s.jsx)(t.th,{children:"Description"}),(0,s.jsx)(t.th,{style:{textAlign:"center"},children:"Required"}),(0,s.jsx)(t.th,{style:{textAlign:"center"},children:"Default"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"eventType"}),(0,s.jsx)(t.td,{children:"The intention of the eventWorkflow. E.g close resources"}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:"yes"}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:"RESOURCE_CLOSURE is supported for now"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"triggerConditions"}),(0,s.jsx)(t.td,{children:"This defines an array of condition for to be met for the event to run"}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:"no"}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:"null"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"eventResourceId"}),(0,s.jsx)(t.td,{children:"uniqueId of resource id to be closed"}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:"yes"}),(0,s.jsx)(t.td,{style:{textAlign:"center"}})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"eventResources"}),(0,s.jsx)(t.td,{children:"A list of resources to close(Type of ResourceConfig)"}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:"yes"}),(0,s.jsx)(t.td,{style:{textAlign:"center"}})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"updateValues"}),(0,s.jsx)(t.td,{children:"Defines a list of jsonPath expressions for the fields to update as well as the values to use"}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:"yes"}),(0,s.jsx)(t.td,{style:{textAlign:"center"}})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"resourceFilterExpressions"}),(0,s.jsx)(t.td,{children:"A list of FhirPath expressions used to filter which resources to close"}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:"no"}),(0,s.jsx)(t.td,{style:{textAlign:"center"}})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"trigger-condition-properties",children:"Trigger condition properties"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Property"}),(0,s.jsx)(t.th,{children:"Description"}),(0,s.jsx)(t.th,{style:{textAlign:"center"},children:"Required"}),(0,s.jsx)(t.th,{style:{textAlign:"center"},children:"Default"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"eventResourceId"}),(0,s.jsx)(t.td,{children:"UniqueId of resource that the trigger conditions are applied to"}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:"yes"}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:"RESOURCE_CLOSURE is supported for now"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"conditionalFhirPathExpressions"}),(0,s.jsx)(t.td,{children:"criteria to ensure we only close the intended resources"}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:"yes"}),(0,s.jsx)(t.td,{style:{textAlign:"center"}})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"matchAll"}),(0,s.jsx)(t.td,{children:"Determines whether all conditional fhirpath expressions should evaluate to true"}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:"no"}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:"True"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{}),(0,s.jsxs)(t.td,{children:[(0,s.jsx)(t.code,{children:"True"})," - Close resources only when all fhirpath expressions evaluate to true"]}),(0,s.jsx)(t.td,{style:{textAlign:"center"}}),(0,s.jsx)(t.td,{style:{textAlign:"center"}})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{}),(0,s.jsxs)(t.td,{children:[(0,s.jsx)(t.code,{children:"False"})," - Close resources when one or more fhirpath expressions evaluate to true"]}),(0,s.jsx)(t.td,{style:{textAlign:"center"}}),(0,s.jsx)(t.td,{style:{textAlign:"center"}})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"event-resource-properties",children:"Event Resource Properties"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Property"}),(0,s.jsx)(t.th,{children:"Description"}),(0,s.jsx)(t.th,{style:{textAlign:"center"},children:"Required"}),(0,s.jsx)(t.th,{style:{textAlign:"center"},children:"Default"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"id"}),(0,s.jsx)(t.td,{children:"uniqueId of resource id to be closed"}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:"yes"}),(0,s.jsx)(t.td,{style:{textAlign:"center"}})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"resource"}),(0,s.jsx)(t.td,{children:"The type of resource"}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:"yes"}),(0,s.jsx)(t.td,{style:{textAlign:"center"}})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"configRules"}),(0,s.jsx)(t.td,{children:"Rules to be that are executed to populate dynamic values such as a patient id"}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:"no"}),(0,s.jsx)(t.td,{style:{textAlign:"center"}})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"dataQueries"}),(0,s.jsx)(t.td,{children:"Configs used to represent how resources to be closed are retrieved from the database"}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:"yes"}),(0,s.jsx)(t.td,{style:{textAlign:"center"}})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"relatedResources"}),(0,s.jsx)(t.td,{children:"Configs that represent how to fetch related resources e.g Tasks linked to a CarePlan"}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:"no"}),(0,s.jsx)(t.td,{style:{textAlign:"center"}})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"dataquery-properties",children:"DataQuery properties"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Property"}),(0,s.jsx)(t.th,{children:"Description"}),(0,s.jsx)(t.th,{style:{textAlign:"center"},children:"Required"}),(0,s.jsx)(t.th,{style:{textAlign:"center"},children:"Default"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"paramName"}),(0,s.jsx)(t.td,{children:"String representation of the resource field to search on"}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:"yes"}),(0,s.jsx)(t.td,{style:{textAlign:"center"}})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"operation"}),(0,s.jsx)(t.td,{children:"Logical SQL operation to perform i.e AND, OR"}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:"yes"}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:"AND"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"filterCriteria"}),(0,s.jsx)(t.td,{children:"Configs that represent the datatype and value for filtering data"}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:"yes"}),(0,s.jsx)(t.td,{style:{textAlign:"center"}})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"updatevalue-properties",children:"UpdateValue properties"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Property"}),(0,s.jsx)(t.th,{children:"Description"}),(0,s.jsx)(t.th,{style:{textAlign:"center"},children:"Required"}),(0,s.jsx)(t.th,{style:{textAlign:"center"},children:"Default"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"jsonPathExpression"}),(0,s.jsx)(t.td,{children:"JsonPath representation of the resource field to update"}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:"yes"}),(0,s.jsx)(t.td,{style:{textAlign:"center"}})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"value"}),(0,s.jsx)(t.td,{children:"The value to update the resource field with"}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:"yes"}),(0,s.jsx)(t.td,{style:{textAlign:"center"}})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"resourceType"}),(0,s.jsx)(t.td,{children:"The name of the resource type to be updated"}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:"yes"}),(0,s.jsx)(t.td,{style:{textAlign:"center"}})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"resource-filter-expression-properties",children:"Resource Filter Expression properties"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Property"}),(0,s.jsx)(t.th,{children:"Description"}),(0,s.jsx)(t.th,{style:{textAlign:"center"},children:"Required"}),(0,s.jsx)(t.th,{style:{textAlign:"center"},children:"Default"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"conditionalFhirPathExpressions"}),(0,s.jsx)(t.td,{children:"Criteria to filter which resources when only a subset of the fetched resources need to be updated e.g only update tasks whose status is not completed"}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:"yes"}),(0,s.jsx)(t.td,{style:{textAlign:"center"}})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"matchAll"}),(0,s.jsx)(t.td,{children:"Determines whether all conditional FhirPath expressions should evaluate to true"}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:"no"}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:"true"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"resourceType"}),(0,s.jsx)(t.td,{children:"The name of the resource type to be updated"}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:"yes"}),(0,s.jsx)(t.td,{style:{textAlign:"center"}})]})]})]})]})}function h(e={}){const{wrapper:t}={...(0,r.a)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(a,{...e})}):a(e)}},1151:(e,t,n)=>{n.d(t,{Z:()=>d,a:()=>l});var s=n(7294);const r={},i=s.createContext(r);function l(e){const t=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function d(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),s.createElement(i.Provider,{value:t},e.children)}}}]);