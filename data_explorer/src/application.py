from flask import Flask, jsonify, request
import pymongo

application = Flask(__name__)
# app.config["MONGO_URI"] = "mongodb://localhost:27017/Sample_Data"
# application.config["MONGO_URI"] = "mongodb+srv://wadezheng0802:0jmVaMjokHSsob9i@cluster0.gncmfim.mongodb.net/Sample_data"
# mongo = pymongo(application)
application.MongoClient = pymongo.mongo_client.MongoClient("mongodb+srv://wadezheng0802:0jmVaMjokHSsob9i@cluster0.gncmfim.mongodb.net/")
#application.MongoClient = pymongo.MongoClient("mongodb://localhost:27017/")


# @application.route('/record/<rec>', methods=['GET']) XXXXXXXXXXXXXXXXXXXXXXXXXX
# def get_one(rec):
#     # """To get one item from the database.
#     db = application.MongoClient["Sample_data"]
#     col = db["Year"]
#     i = col.find_one({'RECORD': int(rec)})
#     output = []
#     output.append({
#         'TIMESTAMP': i['TIMESTAMP'],
#         'RH_Avg': i['RH_Avg'],
#         'RECORD': i['RECORD']
#     })
#     return jsonify({'result': output})


@application.route('/', methods=['GET'])
def homepage():
    return "Hello World!!"


@application.route('/data/<Device_id>', methods=['GET'])
def get_all_attendees(Device_id):
    # To get all the items from the database.
    db = application.MongoClient["Device_Data"]
    collection = db[Device_id]
    output = []
    r = collection.find()
    for i in r:
        output.append({
            'TIMESTAMP': i['TIMESTAMP'],
            'RECORD': i['RECORD'],
            'Year': i['Year'],
            'Month': i['Month'],
            'DOM': i['DOM'],
            'Hour': i['Hour'],
            'Minute': i['Minute'],
            'DOY': i['DOY'],
            'AirTC_Min': i['AirTC_Min'],
            'AirTC_Avg': i['AirTC_Avg'],
            'AirTC_Max': i['AirTC_Max'],
            'RH_Min': i['RH_Min'],
            'RH_Avg': i['RH_Avg'],
            'RH_Max': i['RH_Max'],
            'E_actual_Avg': i['E_actual_Avg'],
            'BP_hPa': i['BP_hPa'],
            'SWTop_Avg': i['SWTop_Avg'],
            'SWBottom_Avg': i['SWBottom_Avg'],
            'cnr4_T_K_Avg': i['cnr4_T_K_Avg'],
            'LWTopC_Avg': i['LWTopC_Avg'],
            'LWBottomC_Avg': i['LWBottomC_Avg'],
            'WindSpd_horiz_ms': i['WindSpd_horiz_ms'],
            'WindSpd_vector_ms': i['WindSpd_vector_ms'],
            'WindDir_resultmean': i['WindDir_resultmean'],
            'WindDir_stdev': i['WindDir_stdev'],
            'PeakGust': i['PeakGust'],
            'Dist2Ice_m': i['Dist2Ice_m'],
            'InclX_Avg': i['InclX_Avg'],
            'InclY_Avg': i['InclY_Avg'],
            'PTemp': i['PTemp'],
            'extPWR_Min': i['extPWR_Min'],
            'intPWR_Min': i['intPWR_Min']
        })
    return jsonify({
        'result': output
    })


@application.route('/record/<device_id>/<rec>', methods=['GET'])
def get_one(device_id, rec):
    # """To get one item from the database.
    db = application.MongoClient["Device_Data"]
    col = db[device_id]
    i = col.find_one({'RECORD': int(rec)})
    output = []
    output.append({
        'TIMESTAMP': i['TIMESTAMP'],
        'RH_Avg': i['RH_Avg'],
        'RECORD': i['RECORD']
    })
    return jsonify({'result': output})


@application.route('/insert/<device_id>', methods=['POST'])
def register(device_id):
    db = application.MongoClient["Device_Data"]
    col = db[device_id]
    TIMESTAMP = request.json['TIMESTAMP']
    str_t = TIMESTAMP.replace(" ", "")
    str_t = str_t.replace("-", "")
    str_t = str_t.replace(":", "")
    TIMESTAMP = int(str_t)
    RECORD = request.json['RECORD']
    Year = request.json['Year']
    Month = request.json['Month']
    DOM = request.json['DOM']
    Hour = request.json['Hour']
    Minute = request.json['Minute']
    DOY = request.json['DOY']
    AirTC_Min = request.json['AirTC_Min']
    AirTC_Avg = request.json['AirTC_Avg']
    AirTC_Max = request.json['AirTC_Max']
    RH_Min = request.json['RH_Min']
    RH_Avg = request.json['RH_Avg']
    RH_Max = request.json['RH_Max']
    E_actual_Avg = request.json['E_actual_Avg']
    BP_hPa = request.json['BP_hPa']
    SWTop_Avg = request.json['SWTop_Avg']
    SWBottom_Avg = request.json['SWBottom_Avg']
    cnr4_T_K_Avg = request.json['cnr4_T_K_Avg']
    LWTopC_Avg = request.json['LWTopC_Avg']
    LWBottomC_Avg = request.json['LWBottomC_Avg']
    WindSpd_horiz_ms = request.json['WindSpd_horiz_ms']
    WindSpd_vector_ms = request.json['WindSpd_vector_ms']
    WindDir_resultmean = request.json['WindDir_resultmean']
    WindDir_stdev = request.json['WindDir_stdev']
    PeakGust = request.json['PeakGust']
    Dist2Ice_m = request.json['Dist2Ice_m']
    InclX_Avg = request.json['InclX_Avg']
    InclY_Avg = request.json['InclY_Avg']
    PTemp = request.json['PTemp']
    extPWR_Min = request.json['extPWR_Min']
    intPWR_Min = request.json['intPWR_Min']
    col.insert_one({
        'TIMESTAMP': TIMESTAMP,
        'RECORD': RECORD,
        'Year': Year,
        'Month': Month,
        'DOM': DOM,
        'Hour': Hour,
        'Minute': Minute,
        'DOY': DOY,
        'AirTC_Min': AirTC_Min,
        'AirTC_Avg': AirTC_Avg,
        'AirTC_Max': AirTC_Max,
        'RH_Min': RH_Min,
        'RH_Avg': RH_Avg,
        'RH_Max': RH_Max,
        'E_actual_Avg': E_actual_Avg,
        'BP_hPa': BP_hPa,
        'SWTop_Avg': SWTop_Avg,
        'SWBottom_Avg': SWBottom_Avg,
        'cnr4_T_K_Avg': cnr4_T_K_Avg,
        'LWTopC_Avg': LWTopC_Avg,
        'LWBottomC_Avg': LWBottomC_Avg,
        'WindSpd_horiz_ms': WindSpd_horiz_ms,
        'WindSpd_vector_ms': WindSpd_vector_ms,
        'WindDir_resultmean': WindDir_resultmean,
        'WindDir_stdev': WindDir_stdev,
        'PeakGust': PeakGust,
        'Dist2Ice_m': Dist2Ice_m,
        'InclX_Avg': InclX_Avg,
        'InclY_Avg': InclY_Avg,
        'PTemp': PTemp,
        'extPWR_Min': extPWR_Min,
        'intPWR_Min': intPWR_Min
    })
    return jsonify({'message': 'Registration successful.'})


@application.route('/export/<device_id>', methods=['POST'])
def export(device_id):
    db = application.MongoClient["Device_Data"]
    col = db[device_id]
    From_time = request.json['TIMESTAMP_F']
    To_time = request.json['TIMESTAMP_T']
    List_V = request.json['List_V']
    f = col.find({'TIMESTAMP': {
        '$gte': From_time,  # 大于等于
        "$lte": To_time}  # 小于等于
    }, {})
    res_l = []
    for m in f:
        dict_t = {}
        for n in List_V:
            dict_t[n] = m[n]
        res_l.append(dict_t)

    return jsonify({'result': res_l})


@application.route('/export-csv/<device_id>', methods=['POST'])
def csv_export(device_id):
    db = application.MongoClient["Device_Data"]
    col = db[device_id]
    From_time = request.json['TIMESTAMP_F']
    To_time = request.json['TIMESTAMP_T']
    List_V = request.json['List_V']
    f = col.find({'TIMESTAMP': {
        '$gte': From_time,  # 大于等于
        "$lte": To_time  # 小于等于
    }
    }, {})
    result = ""
    for i in range(len(List_V)):
        if i == 0:
            result += str(List_V[0])
        else:
            result += (","+str(List_V[i]))
    result += "\n"
    for m in f:
        res_l = ""
        for n in range(len(List_V)):
            if n == 0:
                res_l += str(m[List_V[0]])
            else:
                res_l += ("," + str(m[List_V[n]]))
        res_l += "\n"
        result += res_l
    return jsonify({'result': result})


@application.route('/export-var/<device_id>', methods=['POST'])
def var_export(device_id):
    db = application.MongoClient["Device_Data"]
    col = db[device_id]
    From_time = request.json['TIMESTAMP_F']
    To_time = request.json['TIMESTAMP_T']
    Var = request.json['Varible']
    f = col.find({'TIMESTAMP': {
        '$gte': From_time,  # 大于等于
        "$lte": To_time}  # 小于等于
    }, {})
    result = []
    for m in f:
        result.append(m[Var])
    return jsonify({'result': result})


@application.route('/lastest-status/<device_id>', methods=['GET'])
def lastest(device_id):
    db = application.MongoClient["Device_Data"]
    col = db[device_id]
    i = col.find_one(sort=[("TIMESTAMP", -1)])
    res = ({
        'TIMESTAMP': i['TIMESTAMP'],
        'RECORD': i['RECORD'],
        'Year': i['Year'],
        'Month': i['Month'],
        'DOM': i['DOM'],
        'Hour': i['Hour'],
        'Minute': i['Minute'],
        'DOY': i['DOY'],
        'AirTC_Min': i['AirTC_Min'],
        'AirTC_Avg': i['AirTC_Avg'],
        'AirTC_Max': i['AirTC_Max'],
        'RH_Min': i['RH_Min'],
        'RH_Avg': i['RH_Avg'],
        'RH_Max': i['RH_Max'],
        'E_actual_Avg': i['E_actual_Avg'],
        'BP_hPa': i['BP_hPa'],
        'SWTop_Avg': i['SWTop_Avg'],
        'SWBottom_Avg': i['SWBottom_Avg'],
        'cnr4_T_K_Avg': i['cnr4_T_K_Avg'],
        'LWTopC_Avg': i['LWTopC_Avg'],
        'LWBottomC_Avg': i['LWBottomC_Avg'],
        'WindSpd_horiz_ms': i['WindSpd_horiz_ms'],
        'WindSpd_vector_ms': i['WindSpd_vector_ms'],
        'WindDir_resultmean': i['WindDir_resultmean'],
        'WindDir_stdev': i['WindDir_stdev'],
        'PeakGust': i['PeakGust'],
        'Dist2Ice_m': i['Dist2Ice_m'],
        'InclX_Avg': i['InclX_Avg'],
        'InclY_Avg': i['InclY_Avg'],
        'PTemp': i['PTemp'],
        'extPWR_Min': i['extPWR_Min'],
        'intPWR_Min': i['intPWR_Min']
    })
    return jsonify({'result': res})


# @application.route('/lastest-status/', methods=['GET'])
# def lastest(device_id):
#     db = application.MongoClient["Device_Data"]
#     col = db[device_id]


if __name__ == "__main__":
    application.run(debug=True)
