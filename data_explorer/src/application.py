from flask import Flask, jsonify, request
import pymongo
from flask_cors import CORS

application = Flask(__name__)
# CORS(application, resources=r'/*')
CORS(application)
# app.config["MONGO_URI"] = "mongodb://localhost:27017/Sample_Data"
# application.config["MONGO_URI"] = "mongodb+srv://wadezheng0802:0jmVaMjokHSsob9i@cluster0.gncmfim.mongodb.net/Sample_data"
# mongo = pymongo(application)


application.MongoClient = pymongo.mongo_client.MongoClient(
    "mongodb+srv://wadezheng0802:0jmVaMjokHSsob9i@cluster0.gncmfim.mongodb.net/")
# application.MongoClient = pymongo.MongoClient("mongodb://localhost:27017/")


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
    return jsonify({"res": "we are the world"})


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
    return jsonify({'result': output, "mes": "WhATTTTTTTT THHEEEEE FFFFUUUUCCCCCCKKKKKK"})


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

# line chart数据
@application.route('/dashboard_dg/<device_id>', methods=['POST'])
def dashboarddg_fetch(device_id):
    db = application.MongoClient["Device_Data"]
    col = db[device_id]
    From_time = request.json['TIMESTAMP_F']
    To_time = request.json['TIMESTAMP_T']
    Var = request.json['Varible']
    for i in range(10):
        if col.find_one({"TIMESTAMP": int(From_time) - i * 100}) is not None:
            F_t = From_time - i * 100
            break
        if i == 4:
            return jsonify({"result": "From time not found"}), 404
    for n in range(10):
        if col.find_one({"TIMESTAMP": int(To_time) + n * 100}) is not None:
            T_t = To_time + n * 100
            break
        if n == 4:
            return jsonify({"result": "To time not found"}), 404
    f = col.find({'TIMESTAMP': {
        '$gte': F_t,  # 大于等于
        "$lte": T_t}  # 小于等于
    }, {})
    result = []
    for m in f:
        result.append(m[Var])
    return jsonify({Var: result})

# windrose 用数据
@application.route('/dashboard_wr/<device_id>', methods=['POST'])
def dashboardwr_fetch(device_id):
    db = application.MongoClient["Device_Data"]
    col = db[device_id]
    From_time = request.json['TIMESTAMP_F']
    To_time = request.json['TIMESTAMP_T']
    for i in range(5):
        if col.find_one({"TIMESTAMP": int(From_time) - i * 100}) is not None:
            F_t = int(From_time) + i * 100
            break
        if i == 4:
            return jsonify({"result": "From time not found"}), 404
    for n in range(5):
        if col.find_one({"TIMESTAMP": int(To_time) + n * 100}) is not None:
            T_t = int(To_time) - n * 100
            break
        if n == 4:
            return jsonify({"result": "To time not found"}), 404
    f = col.find({'TIMESTAMP': {
        '$gte': F_t,  # 大于等于
        "$lte": T_t}  # 小于等于
    }, {})
    dir_w = []
    spd = []
    for m in f:
        dir_w.append(m['WindDir_resultmean'])
        spd.append(m['WindSpd_vector_ms'])
    res = [[0 for j in range(16)] for i in range(8)]
    # for i in range(len(dir_w)):
    # return jsonify({"dir": dir_w, "spd": value_w})
    for i in range(len(dir_w)):
        wind_level = 0
        wind_dir_t = 0
        if spd[i] <= 0.2:
            wind_level = 0
        elif spd[i] <= 1.5:
            wind_level = 1
        elif spd[i] <= 3.3:
            wind_level = 2
        elif spd[i] <= 5.4:
            wind_level = 3
        elif spd[i] <= 7.9:
            wind_level = 4
        elif spd[i] <= 10.7:
            wind_level = 5
        elif spd[i] <= 13.8:
            wind_level = 6
        elif spd[i] < 100:
            wind_level = 7

        if dir_w[i] <= 11.25:
            wind_dir_t = 0
        elif dir_w[i] <= 33.75:
            wind_dir_t = 1
        elif dir_w[i] <= 56.25:
            wind_dir_t = 2
        elif dir_w[i] <= 78.75:
            wind_dir_t = 3
        elif dir_w[i] <= 101.25:
            wind_dir_t = 4
        elif dir_w[i] <= 123.75:
            wind_dir_t = 5
        elif dir_w[i] <= 146.25:
            wind_dir_t = 6
        elif dir_w[i] <= 168.75:
            wind_dir_t = 7
        elif dir_w[i] <= 191.25:
            wind_dir_t = 8
        elif dir_w[i] <= 213.75:
            wind_dir_t = 9
        elif dir_w[i] <= 236.25:
            wind_dir_t = 10
        elif dir_w[i] <= 258.75:
            wind_dir_t = 11
        elif dir_w[i] <= 281.25:
            wind_dir_t = 12
        elif dir_w[i] <= 303.75:
            wind_dir_t = 13
        elif dir_w[i] <= 326.25:
            wind_dir_t = 14
        elif dir_w[i] <= 348.75:
            wind_dir_t = 15
        else:
            wind_dir_t = 0
        res[wind_level][wind_dir_t] += 1
    return jsonify({"res": res})


# line chart数据
@application.route('/dashboard_line_xy/<device_id>', methods=['POST'])
def dashboardline_xy(device_id):
    db = application.MongoClient["Device_Data"]
    col = db[device_id]
    From_time = request.json['TIMESTAMP_F']
    To_time = request.json['TIMESTAMP_T']
    Var = request.json['Varible']
    for i in range(10):
        if col.find_one({"TIMESTAMP": int(From_time) - i * 100}) is not None:
            F_t = From_time - i * 100
            break
        if i == 4:
            return jsonify({"result": "From time not found"}), 404
    for n in range(10):
        if col.find_one({"TIMESTAMP": int(To_time) + n * 100}) is not None:
            T_t = To_time + n * 100
            break
        if n == 4:
            return jsonify({"result": "To time not found"}), 404
    f = col.find({'TIMESTAMP': {
        '$gte': F_t,  # 大于等于
        "$lte": T_t}  # 小于等于
    }, {})
    result_T = []
    result_v = []
    for m in f:
        result_v.append(m[Var])
        result_T.append(m["TIMESTAMP"])
    return jsonify({"x": result_T, "y": result_v})


# 测试
@application.route('/da', methods=['GET'])
def da():
    #db = application.MongoClient["Device_Data"]
    # col = db[device_id]
    #From_time = request.json['TI']
    res = [
        [17, 2, 18, 4, 2, 3, 4, 6, 1, 6, 3, 4, 2, 3, 4, 6],
        [7, 12, 13, 2, 2, 3, 4, 6, 1, 2, 3, 2, 2, 3, 4, 6],
        [10, 12, 13, 4, 2, 13, 14, 26, 11, 12, 23, 34, 12, 33, 34, 32],
        [10, 2, 13, 2, 2, 3, 4, 6, 1, 2, 3, 2, 2, 3, 4, 6],
        [10, 2, 13, 4, 2, 3, 4, 6, 1, 2, 3, 4, 1, 2, 3, 1],
        [10, 2, 13, 2, 2, 3, 4, 6, 1, 2, 3, 2, 1, 2, 3, 1],
        [10, 2, 13, 4, 2, 3, 4, 6, 1, 2, 3, 4, 2, 3, 4, 2],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ] 
    return jsonify({"res": "HIIIIIIIIII"})


if __name__ == "__main__":
    application.run(debug=True, port=8000)
