<template>
  <div class="home">
    <textarea class="form-control mb-2" v-model="rawJson" placeholder="需要转换的JSON数据" rows="15"></textarea>
    <a @click="trans" class="btn btn-primary">转换</a>
    <div class="panel panel-default" v-if="rawMess !== ''">
      <div class="panel-body">
        <prism language="javascript">{{ rawMess }}</prism>
      </div>
    </div>
  </div>
</template>

<script>
import Prism from "vue-prism-component";
export default {
  name: "Home",
  data() {
    return {
      rawJson: "",
      rawMess: "",
    };
  },
  components: {
    Prism,
  },
  methods: {
    trans() {
      let checkJson = this.isJSON(this.rawJson);
      if (!checkJson) {
        alert("It is not a json string!");
        return;
      }

      //将json转为protobuf message
      this.rawMess = this.genTpl(JSON.parse(this.rawJson));
    },
    isJSON(str) {
      if (typeof str == "string") {
        try {
          JSON.parse(str);
          return true;
        } catch (e) {
          console.log(e);
          return false;
        }
      }
      alert("It is not a string!");
    },
    genTpl(obj) {
      console.log(obj);
      console.log(this.parseObj(obj));

      return `message AutoGenerate {
${this.parseObj(obj)}
}`;
    },
    parseObj(obj) {
      let index = 1;
      let body = "";
      for (let key in obj) {
        let typ = typeof obj[key];
        switch (typ) {
          case "number":
            body += "int64 " + key + " = " + index + ";\n";
            break;
          case "boolean":
            body += "bool " + key + " = " + index + ";\n";
            break;
          case "string":
            body += "string " + key + " = " + index + ";\n";
            break;
          case "object":
            if (obj[key] instanceof Array) {
              //是数组
              //数组里面是基本类型?
              let item = obj[key];
              let typ = typeof item[0];
              console.log(item[0], typ);
              if (typ !== "object") {
                body +=
                  "repeated " +
                  this.getBaseType(typ) +
                  " " +
                  key +
                  " = " +
                  index +
                  ";\n";
              } else {
                let newKey = key.slice(0, 1).toUpperCase() + key.slice(1);
                body += `message ${newKey} {
${this.parseObj(item[0])}
}
repeated ${newKey} ${key} = ${index};
                                    `;
              }
            } else {
              //是对象
              let item = obj[key];
              let newKey = key.slice(0, 1).toUpperCase() + key.slice(1);
                body += `message ${newKey} {
${this.parseObj(item)}
}
repeated ${newKey} ${key} = ${index};
                                    `;
            }
            break;
        }
        index++;
      }
      return body;
    },
    getBaseType(typ) {
      switch (typ) {
        case "number":
          return "int64";
        case "boolean":
          return "bool";
        case "string":
          return "string";
        default:
          return "undefined";
      }
    },
  },
};
</script>
