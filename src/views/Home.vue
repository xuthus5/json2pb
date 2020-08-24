<template>
    <div class="home">
        <table>
            <tbody>
            <tr>
                <th style="width: 45%;">JSON</th>
                <th style="width: 10%; font-size: 22px;"> --></th>
                <th style="width: 45%;">Protobuf Message
                    <button class="copy btn btn-grey" type="button"
                            v-clipboard:copy="rawMess"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError"
                    >Copy
                    </button>
                </th>
            </tr>
            </tbody>
        </table>
        <table>
            <tbody>
            <tr>
                <td style="width: 50%;">
                    <textarea class="form-control mb-2" v-model="rawJson" placeholder="Paste JSON here"
                              rows="35"></textarea>
                </td>
                <td style="width: 50%;">
                    <textarea class="form-control mb-2" readonly v-model="rawMess"
                              placeholder="Protobuf Message will appear here" rows="35"></textarea>
                    <!--                    <div id="output"><span style="color: #777;">Go will appear here</span></div>-->
                </td>
            </tr>
            </tbody>
        </table>

        <button type="button" @click="trans" class="btn btn-primary">Convert</button>

        <footer class="mt-5">
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
                            Try converting JSON from the Example <a href="javascript:" @click="example">DataSet</a>.
                        </p>
                        <p>
                            © 2020 <a href="https://xuthus.cc" target="_blank">Young Xu</a>
                            • <a href="https://github.com/xuthus5/json2pb" target="_blank">View on GitHub</a>
                        </p>
                    </b-col>
                </b-row>
            </b-container>

            © 2020 Young Xu
            <br>
            You can find me on <a href="https://github.com/xuthus5" target="_blank">GitHub</a>.
        </footer>
    </div>
</template>

<script>
String.prototype.times = function(n) {
    if ( n == 1 ) {
        return this;
    }
    var midRes = this.times(Math.floor(n/2));
    midRes += midRes;
    if ( n % 2 ) {
        midRes += this;
    }
    return midRes;
}

export default {
    name: "Home",
    data() {
        return {
            rawJson: "",
            rawMess: "",
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
            console.log('success');
        },
        onError(e) {
            console.log('copy error:', e);
        },
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
            return `message AutoGenerate {
${this.parseObj(obj,1)}
}`;
        },
        parseObj(obj,level) {
            let index = 1;
            let body = "";
            for (let key in obj) {
                let typ = typeof obj[key];
                switch (typ) {
                    case "number":
                        body += ('\t'.times(level)) + "int64 " + key + " = " + index + ";\n";
                        break;
                    case "boolean":
                        body += ('\t'.times(level)) + "bool " + key + " = " + index + ";\n";
                        break;
                    case "string":
                        body += ('\t'.times(level)) + "string " + key + " = " + index + ";\n";
                        break;
                    case "object":
                        if (obj[key] instanceof Array) {
                            //是数组
                            //数组里面是基本类型?
                            let item = obj[key];
                            let typ = typeof item[0];
                            if (typ !== "object") {
                                body += ('\t'.times(level)) + "repeated " + this.getBaseType(typ) +" " +  key + " = " + index + ";\n";
                            } else {
                                let newKey = key.slice(0, 1).toUpperCase() + key.slice(1);
                                body += ('\t'.times(level)) + `message ${newKey} {
${this.parseObj(item[0],level+1)}
${'\t'.times(level) }}
${'\t'.times(level) }repeated ${newKey} ${key} = ${index};
`;
                            }
                        } else {
                            //是对象
                            //when parent node is array ; then set default message name: data_index
                            let realMessageKey = key;
                            if (key == 0) realMessageKey = 'Data_' + key;

                            let item = obj[key];
                            realMessageKey = realMessageKey.slice(0, 1).toUpperCase() + realMessageKey.slice(1);
                            let realDataKey = realMessageKey.slice(0, 1).toLowerCase() + realMessageKey.slice(1);
                            body += ('\t'.times(level)) + `message ${realMessageKey} {
${this.parseObj(item,level+1)}
${'\t'.times(level) }}
${'\t'.times(level) }repeated ${realMessageKey} ${realDataKey} = ${index};
`;
                        }
                        break;
                }
                index++;
                if (obj instanceof Array) {
                    break;
                }
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

<style scoped>

.copy {
    color: #FFFFFF;
}

.btn-grey {
    background: #80808099;
}
</style>