const predef = require('./tools/predef');
const { px, du, op, min, max } = require("./tools/graphics");



const hozLineTool = {
    
    init() {
        this.IndexR = 0
        
        return {
            mode: 'none'
        }
    },
    
    


    render({props, anchors, state, index}) {
        
        const rand = Math.floor(Math.random() * 2000);
        
        
        
        return {
            items: [
                {
                    tag: 'LineSegments',
                    key: 'line',
                    lines: [
                        {
                            tag: 'Line',
                            a: anchors[0],
                            b: anchors[1],
                            infiniteStart: props.IsLine,
                            infiniteEnd: props.IsRay
                        }
                    ],
                    lineStyle: {
                        lineWidth: props.LineThickness,
                        lineStyle: props.LineStyle,
                        color: props.LineColor
                    }
                },
                {   
                        tag: 'Text',
                        key: 'HLineText: ' + rand,
                        point: {
                            //x: anchors[1] ? du(5) : du(0),
                            //x: anchors[1] && props.IsRay ? op(du(this.IndexR+1)) : anchors[1] ? du(anchors[1].x.value) : du(0),
                            x: anchors[1] && props.IsRay && props.TextAlign == "Right" ? du(anchors[1].x.value) : anchors[1] && props.IsRay && props.TextAlign == "Left" ? du(anchors[0].x.value) : du(0),
                            y: anchors[1] ? (du(anchors[1].y.value+5)) : du(0)
                        },
                        text: props.LineText != "None" ? props.LineText : " ",
                        //text: props.LineText != "None" ? props.LineText : " ",
                        style: { fontSize: 10, fontWeight: "bold", fill: "#FFFFFF" },
                        textAlignment: 'rightMiddle',
                        global: true,
               
                }
            ]
        }
    },
    
    anchorRestraints() {
        return [
            {/*zeroth position anchor*/x: 10 },
            {/*first position anchor*/y: 0 }
        ]
    },
    
    anchorStyles() {
        return [
            {/*zeroth position anchor*/color: '#A46F14' },
            {/*first position anchor*/color: '#A46F14' },
        ]
    }
}

module.exports = {
    name: "Sethmo Horizontal Line w/Text",
    drawing: hozLineTool,
    description: "+ Horizontal Line w/Text",
    params: {
        IsRay: predef.paramSpecs.bool(true),
        IsLine: predef.paramSpecs.bool(false),
        LineThickness: predef.paramSpecs.number(1,1,1),
        LineStyle: predef.paramSpecs.number(1,1,1),
        LineColor: predef.paramSpecs.color('#FFFFFF'),
        TextAlign: predef.paramSpecs.enum({
            Left: 'Left Anchor',
            Right: 'Right Anchor'
        }, 'Right'),
        LineText: predef.paramSpecs.enum({
            None: 'None',
            Settlement: 'Settlement',
            R5: 'R5',
            R4: 'R4',
            R3: 'R3',
            R2: 'R2',
            R1: 'R1',
            S1: 'S1',
            S2: 'S2',
            S3: 'S3',
            S4: 'S4',
            S5: 'S5',
            Hourly: 'Hourly',
            LVN: 'Low Volume Node',
            HVN: 'High Volume Node',
            GBXLow: 'Globex Low',
            GBXHigh: 'Globex High',
            RTHLow: 'RTH Low',
            RTHHigh: 'RTH High',
            PrevDayPOC: 'Prev Day POC',
            PrevWeekPOC: 'Prev Week POC',
            SwingPOC: 'Swing POC',
            PrevWeeklyLow: 'Prev Weekly Low',
            PrevWeeklyHigh: 'Prev Weekly High',
            WeeklyLow: 'Weekly Low',
            WeeklyHigh: 'Weekly High',
            MonthlyLow: 'Monthly Low',
            MonthlyHigh: 'Monthly High',
            GapUp: "Gap Up",
            GapDown: "Gap Down",
            BearPivot: 'Bear Pivot',
            BullPivot: 'Bull Pivot'
        }, 'None')
    },
    minN: 2,
    maxN: 2
}
