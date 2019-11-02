import forEach from 'lodash/forEach'

function getQueryElement(operator,field_name, field_type, value) {
  let start_operator = '<' + operator + '>',
  end_operator = '</' + operator + '>'

  field_name = '<FieldRef Name="' + field_name + '" LookupId="TRUE"/>'
  value = '<Value Type="' + field_type + '">'+ value + '</Value>'

  return start_operator + field_name + value + end_operator
}

function getQueryWrapper(query){
  let query_start = '<Query>',
  query_end = '</Query>'
  return query_start + query + query_end
}
function getViewWrapper(query){
  let view_start = '<View>',
  view_end = '</View>'
  return view_start + query + view_end
}
function getWhereWrapper(query){
  let where_start = '<Where>',
  where_end = '</Where>'
  return where_start + query + where_end
}

function getQueryWrapped(query){
  return getViewWrapper(getQueryWrapper(getWhereWrapper(query)))
}

function getArrayOfQueries(obj,field,operator,field_name,field_type){
  let queries = []
  forEach(obj,(item)=>{
    let value = (item[field])?item[field]:item,
    query = getQueryElement(
      operator,
      field_name,
      field_type,
      value
    )
    if(item.proficiency_level){
      let proficiency_level_arr = this.getArrayOfQueries(item.proficiency_level,'','Eq','Proficiency','Lookup')
      proficiency_level_arr = this.getNestedQuery(proficiency_level_arr,'Or')
      console.log('getArrayOfQueries',proficiency_level_arr)
      if(proficiency_level_arr != ""){
        query = '<And>' + query + proficiency_level_arr + '</And>'
      }
    }
    queries.push(query)
  })
  return queries
}

// function getProficiency(obj,operator,field_name,field_type){
//   forEach(obj,(item)=>{
//     let value = item,
//     query = getQueryElement(
//       operator,
//       field_name,
//       field_type,
//       value
//     )
//   })
// }

// function getArrayOfQueries(obj,field,operator,field_name,field_type){
//   let queries = []
//   forEach(obj,(item)=>{
//     let value = (item[field])?item[field]:item,
//     query = getQueryElement(
//       operator,
//       field_name,
//       field_type,
//       value
//     )
//     queries.push(query)
//   })
//   return queries
// }

function getNestedQuery(obj,operator){
  let start_op = '<'+ operator +'>',
  end_op = '</'+ operator +'>',
  query_string = '',
  length = obj.length
  
  // console.log(obj)
  forEach(obj,(item,k)=>{
    // console.log(item)
    // console.log(k)
    if(length === 0){
      query_string = item 
    }
    if(length>0 && k < length-1){
      // if(k % 2 === 0){
        //   counter++
        // }
      query_string += start_op 
      query_string += item 
    }
    if(length>0 && k === length-1){
      query_string += item 
    }
    // console.log(query_string)
  })
  if(length>1){
    for (let i = 0; i < length-1; i++) {
      query_string += end_op 
    }
  }
  return query_string
}

export default { getArrayOfQueries, getQueryElement, getNestedQuery,getQueryWrapped }




let requestData = {
  "query": {
      "__metadata": {
          "type": "SP.CamlQuery"
      },
      "ViewXml":"<View><Query><Where><Joins><Join Type='LEFT' ListAlias='JobOptionsList'><Eq><FieldRef Name='Title' RefType='Id' /><FieldRef List='JobOptionsList' Name='ID' /></Eq></Join><Join Type='LEFT' ListAlias='JobCompetencies'><Eq><FieldRef List='JobTitle' Name='JobTitle' RefType='Id' /><FieldRef List='JobCompetencies' Name='ID' /></Eq></Join></Joins></Where></Query></View>"
  }
},
endpointUrl = "https://myconnect.gsk.com/sites/finance/capabilities/career-competency/_api/web/lists/getbytitle('JobCompetencies')/getItems"
$.ajax({
  url: endpointUrl,
  type: "POST",
  headers: {
      "X-RequestDigest": $("#__REQUESTDIGEST").val(),
      "Accept": "application/json; odata=verbose",
      "Content-Type": "application/json; odata=verbose"
  },
  dataType: "json",
  data: JSON.stringify(requestData)
}).then((res)=>{
  console.log(res)
})


<ViewFields>
  <FieldRef Name='ID'/>
  <FieldRef Name='Title'/>
</ViewFields> 
<Joins>
  <Join Type='LEFT' ListAlias='JobOptionsList'>
    <Eq>
      <FieldRef Name='Title' RefType='Id' />
      <FieldRef List='JobOptionsList' Name='ID' />
    </Eq>
  </Join>
  <Join Type='LEFT' ListAlias='JobCompetencies'>
    <Eq>
      <FieldRef List='JobOptionsList' Name='JobTitle' RefType='Id' />
      <FieldRef List='JobCompetencies' Name='ID' />
    </Eq>
  </Join>
</Joins>


<View><ViewFields><FieldRef Name='ID'/><FieldRef Name='Title'/></ViewFields><Joins><Join Type='LEFT' ListAlias='JobOptionsList'><Eq><FieldRef Name='Title' RefType='Id' /><FieldRef List='JobOptionsList' Name='ID' /></Eq></Join><Join Type='LEFT' ListAlias='JobCompetencies'><Eq><FieldRef List='JobOptionsList' Name='JobTitle' RefType='Id' /><FieldRef List='JobCompetencies' Name='ID' /></Eq></Join></Joins><Query><Where><IsNotNull><FieldRef Name='ID' /></IsNotNull></Where></Query></View>

<ViewFields><FieldRef Name='ID'/><FieldRef Name='Title'/></ViewFields><Joins><Join Type='LEFT' ListAlias='JobOptionsList'><Eq><FieldRef Name='Title' RefType='Id' /><FieldRef List='JobOptionsList' Name='ID' /></Eq></Join><Join Type='LEFT' ListAlias='JobCompetencies'><Eq><FieldRef List='JobTitle' Name='JobTitle' RefType='Id' /><FieldRef List='JobCompetencies' Name='ID' /></Eq></Join></Joins>