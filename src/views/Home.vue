<template>
  <div class="home">
    <table>
      <tbody>
        <tr>
          <th style="width: 45%;">JSON</th>
          <th style="width: 10%; font-size: 22px;">--></th>
          <th style="width: 45%;">
            Protobuf Message
            <button
              class="copy btn btn-grey"
              type="button"
              v-clipboard:copy="rawMess"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
            >Copy</button>
          </th>
        </tr>
      </tbody>
    </table>
    <table>
      <tbody>
        <tr>
          <td style="width: 50%;">
            <codemirror
              ref="cmEditor"
              :value="rawJson"
              :options="cmOptions"
              @ready="onCmReady"
              @focus="onCmFocus"
              @input="onCmCodeChange"
              class="input"
              placeholder="Paste JSON here"
            />
          </td>
          <td style="width: 50%;">
            <span v-if="rawMess === ''">
              <b-card class="output" bg-variant="light" text-variant="dark">
                <b-card-text
                  class="text-left mt-2 ml-3 text-default-placeholder"
                >Protobuf Message will appear here.</b-card-text>
              </b-card>
            </span>
            <span v-else>
              <b-card class="output" bg-variant="light" text-variant="dark">
                <b-card-text class="text-left">
                  <highlight-code lang="protobuf">{{rawMess}}</highlight-code>
                </b-card-text>
              </b-card>
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <button type="button" @click="trans" class="btn btn-primary mt-3">Convert</button>

    <footer class="mt-5 mb-3">
      <b-container>
        <b-row>
          <b-col md="6" lg="6" xl="6" offset="3">
            <p>
              This tool instantly converts JSON into a Protobuf Message definition. Paste a JSON structure
              on the left and the equivalent Protobuf Message will be generated to the right, which you
              can paste into your program. The script has to make some assumptions, so double-check the
              output!
            </p>
            <p>
              Try converting JSON from the Example
              <a href="javascript:" @click="example">DataSet</a>.
            </p>
            <p>
              © {{new Date().getFullYear()}}
              <a href="https://xuthus.cc" target="_blank">Young Xu</a>
              •
              <a
                href="https://github.com/xuthus5/json2pb"
                target="_blank"
              >View on GitHub</a>
            </p>
          </b-col>
        </b-row>
      </b-container>You can find me on
      <a href="https://github.com/xuthus5" target="_blank">GitHub</a>.
    </footer>
  </div>
</template>

<script>
String.prototype.times = function (n) {
  if (n == 1) {
    return this;
  }
  var midRes = this.times(Math.floor(n / 2));
  midRes += midRes;
  if (n % 2) {
    midRes += this;
  }
  return midRes;
};

export default {
  name: "Home",
  data() {
    return {
      rawJson: "",
      rawMess: "",
      cmOptions: {
        tabSize: 4,
        mode: { name: "javascript", json: true },
        theme: "eclipse",
        lineNumbers: true,
        line: true,
        highlightDifferences: true,
        // more CodeMirror options...
      },
      expJson: `[
\t{
\t\t"input_index": 0,
\t\t"candidate_index": 0,
\t\t"delivery_line_1": "1 N Rosedale St",
\t\t"last_line": "Baltimore MD 21229-3737",
\t\t"delivery_point_barcode": "212293737013",
\t\t"components": {
\t\t\t"primary_number": "1",
\t\t\t"street_predirection": "N",
\t\t\t"street_name": "Rosedale",
\t\t\t"street_suffix": "St",
\t\t\t"city_name": "Baltimore",
\t\t\t"state_abbreviation": "MD",
\t\t\t"zipcode": "21229",
\t\t\t"plus4_code": "3737",
\t\t\t"delivery_point": "01",
\t\t\t"delivery_point_check_digit": "3"
\t\t},
\t\t"metadata": {
\t\t\t"record_type": "S",
\t\t\t"zip_type": "Standard",
\t\t\t"county_fips": "24510",
\t\t\t"county_name": "Baltimore City",
\t\t\t"carrier_route": "C047",
\t\t\t"congressional_district": "07",
\t\t\t"rdi": "Residential",
\t\t\t"elot_sequence": "0059",
\t\t\t"elot_sort": "A",
\t\t\t"latitude": 39.28602,
\t\t\t"longitude": -76.6689,
\t\t\t"precision": "Zip9",
\t\t\t"time_zone": "Eastern",
\t\t\t"utc_offset": -5,
\t\t\t"dst": true
\t\t},
\t\t"analysis": {
\t\t\t"dpv_match_code": "Y",
\t\t\t"dpv_footnotes": "AABB",
\t\t\t"dpv_cmra": "N",
\t\t\t"dpv_vacant": "N",
\t\t\t"active": "Y"
\t\t}
\t},
\t{
\t\t"input_index": 0,
\t\t"candidate_index": 1,
\t\t"delivery_line_1": "1 S Rosedale St",
\t\t"last_line": "Baltimore MD 21229-3739",
\t\t"delivery_point_barcode": "212293739011",
\t\t"components": {
\t\t\t"primary_number": "1",
\t\t\t"street_predirection": "S",
\t\t\t"street_name": "Rosedale",
\t\t\t"street_suffix": "St",
\t\t\t"city_name": "Baltimore",
\t\t\t"state_abbreviation": "MD",
\t\t\t"zipcode": "21229",
\t\t\t"plus4_code": "3739",
\t\t\t"delivery_point": "01",
\t\t\t"delivery_point_check_digit": "1"
\t\t},
\t\t"metadata": {
\t\t\t"record_type": "S",
\t\t\t"zip_type": "Standard",
\t\t\t"county_fips": "24510",
\t\t\t"county_name": "Baltimore City",
\t\t\t"carrier_route": "C047",
\t\t\t"congressional_district": "07",
\t\t\t"rdi": "Residential",
\t\t\t"elot_sequence": "0064",
\t\t\t"elot_sort": "A",
\t\t\t"latitude": 39.2858,
\t\t\t"longitude": -76.66889,
\t\t\t"precision": "Zip9",
\t\t\t"time_zone": "Eastern",
\t\t\t"utc_offset": -5,
\t\t\t"dst": true
\t\t},
\t\t"analysis": {
\t\t\t"dpv_match_code": "Y",
\t\t\t"dpv_footnotes": "AABB",
\t\t\t"dpv_cmra": "N",
\t\t\t"dpv_vacant": "N",
\t\t\t"active": "Y"
\t\t}
\t}
]`,
    };
  },
  methods: {
    example() {
      this.rawJson = this.expJson;
    },
    onCopy(e) {
      console.log("success");
    },
    onError(e) {
      console.log("copy error:", e);
    },
    onCmReady(cm) {
      // console.log("the editor is readied!", cm);
    },
    onCmFocus(cm) {
      // console.log("the editor is focused!", cm);
    },
    onCmCodeChange(newCode) {
      // console.log("this is new code", newCode);
      this.rawJson = newCode;
    },
    trans() {
      let checkJson = this.isJSON(this.rawJson);
      if (!checkJson) {
        alert("It is not a json string!");
        return;
      }
      // console.log(JSON.parse(this.rawJson));

      //convert json to protobuf message
      this.rawMess = this.genTpl(JSON.parse(this.rawJson));
      this.$forceUpdate();
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
      return `message AutoGenerate {
${this.parseObj(obj, 1)}
}`;
    },
    parseObj(obj, level) {
      let index = 1;
      let body = "";
      for (let key in obj) {
        let typ = typeof obj[key];
        switch (typ) {
          case "number":
            let numberType = this.getNumberType(obj[key]);
            body +=
              "\t".times(level) +
              numberType +
              " " +
              key +
              " = " +
              index +
              ";\n";
            break;
          case "boolean":
            body += "\t".times(level) + "bool " + key + " = " + index + ";\n";
            break;
          case "string":
            body += "\t".times(level) + "string " + key + " = " + index + ";\n";
            break;
          case "object":
            if (obj[key] instanceof Array) {
              //isArray
              //base type in array item
              let item = obj[key];
              if (item.length === 0) {
                body +=
                  "\t".times(level) +
                  "repeated " +
                  this.uppercase(key) +
                  " " +
                  key +
                  " = " +
                  index +
                  ";\n";
              } else {
                let _it = item[0];
                let typ = typeof item[0];
                if (typ !== "object") {
                  body +=
                    "\t".times(level) +
                    "repeated " +
                    this.getBaseType(typ) +
                    " " +
                    key +
                    " = " +
                    index +
                    ";\n";
                } else {
                  if (_it == null) {
                    body += `${"\t".times(
                      level
                    )}google.protobuf.Any ${key} = ${index};
`;
                  } else {
                    let newKey = key.slice(0, 1).toUpperCase() + key.slice(1);
                    body +=
                      "\t".times(level) +
                      `message ${newKey} {
${this.parseObj(item[0], level + 1)}
${"\t".times(level)}}
${"\t".times(level)}repeated ${newKey} ${key} = ${index};
`;
                  }
                }
              }
            } else {
              //isObject
              //when parent node is array ; then set default message name: data_index
              if (obj[key] === null) {
                body += `${"\t".times(
                  level
                )}google.protobuf.Any ${key} = ${index};
`;
              } else {
                let realMessageKey = key;
                if (key == 0) realMessageKey = "Data_" + key;

                let item = obj[key];
                realMessageKey =
                  realMessageKey.slice(0, 1).toUpperCase() +
                  realMessageKey.slice(1);
                let realDataKey =
                  realMessageKey.slice(0, 1).toLowerCase() +
                  realMessageKey.slice(1);
                body +=
                  "\t".times(level) +
                  `message ${realMessageKey} {
${this.parseObj(item, level + 1)}
${"\t".times(level)}}
${"\t".times(level)}${realMessageKey} ${realDataKey} = ${index};
`;
              }
            }
            break;
        }
        index++;
        if (obj instanceof Array) {
          break;
        }
      }

      return body.substring(0, body.lastIndexOf("\n"));
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
    uppercase(str) {
      return str.slice(0, 1).toUpperCase() + str.slice(1);
    },
    lowercase(str) {
      return str.slice(0, 1).toLowerCase() + str.slice(1);
    },
    getNumberType(value) {
      if (value % 1 === 0) {
        if (value < 0) {
          if (value < -2147483648) {
            return "int64";
          }
          return "int32";
        }
        if (value > 4294967295) {
          return "uint64";
        }
        return "uint32";
      }
      return "double";
    },
  },
  computed: {
    codemirror() {
      return this.$refs.cmEditor.codemirror;
    },
  },
  mounted() {
    // console.log("the current CodeMirror instance object:", this.codemirror);
    // you can use this.codemirror to do something...
  },
};
</script>

<style>
.copy {
  color: #ffffff;
}

.btn-grey {
  background: #80808099;
}

.input {
  width: 100%;
  height: 614px !important;
}

.CodeMirror {
  width: 100%;
  height: 614px !important;
  text-align: left !important;
  font-family: "Courier New", Courier, monospace;
}

.output {
  background-color: #e9ecef;
  white-space: pre;
  width: 100%;
  height: 614px;
  overflow: scroll;
  tab-size: 4;
}
.card-body {
  padding: 0;
}
.hljs {
  padding: 1.5em;
}
pre {
  margin-bottom: 0;
}

textarea {
  tab-size: 4;
  text-align: left;
}

.CodeMirror-scroll {
  padding: 0;
  margin: 0;
}

.CodeMirror pre.CodeMirror-line, .CodeMirror pre.CodeMirror-line-like {
  color: #777;
  font-family: "Courier New", Courier, monospace;
}

.text-default-placeholder {
  color: #777;
  font-family: "Courier New", Courier, monospace;
}

.hljs {
  background: rgb(248, 249, 250) !important;
}
</style>