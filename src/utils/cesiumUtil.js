import * as Cesium from 'cesium'

export const globalParams = {
    viewer: undefined,
    fireByDataSourcePromise: undefined,
    wildFireCollection: [],
    smokeCollection: [],
}

export const initViewer = (viewerId) => {
    
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(80,22,130,50)
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiY2ExNmYyOC0yYjk5LTRjOGMtYTI0ZC0xZmFmMDAwMzhlZDUiLCJpZCI6NTI1MjgsImlhdCI6MTYxODY2NjE5N30.ETTMOAYLjTMplvAxKehiZCrzT1o2s--bFqREAOSP3fg';

    globalParams.viewer = new Cesium.Viewer(viewerId, { 
        geocoder: false,
        navigationHelpButton: false,
        selectionIndicator: false,
        baseLayerPicker: false,
        showRenderLoopErrors: false,
        fullscreenButton: false,
        sceneModePicker: false,
        // imageryProvider: new Cesium.IonImageryProvider({ assetId: 3 }),
        imageryProvider: new Cesium.UrlTemplateImageryProvider({
            url: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
            minimumLevel: 3,
            maximumLevel: 18
        }),
        // terrainProvider: Cesium.createWorldTerrain({requestVertexNormals: true,requestWaterMask: true}),
    })

    // globalParams.viewer.scene.globe.enableLighting = true
    globalParams.viewer.cesiumWidget.creditContainer.style.display = 'none'

    let start = Cesium.JulianDate.now(new Date())
    let end = Cesium.JulianDate.addHours(start, 12, new Cesium.JulianDate());
    globalParams.viewer.timeline.zoomTo(start,end);

    let clock = globalParams.viewer.clock;
    clock.startTime = start;
    clock.endTime = end;
    clock.currentTime = start;
    clock.clockRange=Cesium.ClockRange.CLAMPED;
    clock.multiplier=1000;
}

function showPromiseData(dataSourcePromise, flag) {

    dataSourcePromise.then((datasource) => {
        let entitiesArr = datasource.entities.values
        let len = entitiesArr.length - 1
        while (len >= 0) {
            let entity = entitiesArr[len--]
            entity.polyline.show = flag
            entity.polygon.show = flag
        }
    })
}

export const addWildFire = (_viewer) => {

    _viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(
            118.1610,27.2343,10000.0
        ),
        orientation: {
            heading: Cesium.Math.toRadians(350),
            pitch: Cesium.Math.toRadians(-50),
            roll: 0.0,
        },
    })

    globalParams.viewer.clock.multiplier = 1000

    if(globalParams.fireByDataSourcePromise == undefined){

        let promise = Cesium.GeoJsonDataSource.load(
            '/src/assets/hgfireby.json',
            {
                clampToGround: true
            }
        )
        globalParams.viewer.clock.shouldAnimate = true
        globalParams.fireByDataSourcePromise = promise
        
        promise.then(function(datasource) {
            
            _viewer.dataSources.add(datasource)
            
            let entitiesArr = datasource.entities.values
            
            let start = Cesium.JulianDate.now(new Date())
            let trueStart = Cesium.JulianDate.addHours(start, 1, new Cesium.JulianDate());
            let stop = Cesium.JulianDate.addHours(start, 24, new Cesium.JulianDate());
                
            let len = entitiesArr.length
    
            let entityColor = ['#D2B48C','#CD853F','#B22222','#FFA07A','#FF8C00','#FF7F50','#FF0000','#FF1493','#EE82EE','#C71585','#9932CC','#800080']
            
            for (let i = 0; i < len; i++) {
                let entity = entitiesArr[i] 
                entity.polygon.material = Cesium.Color.fromCssColorString(entityColor[i])
                entity.polygon.outline = true;
                entity.polygon.outlineWidth = 1;
                entity.polyline = {
                    positions: entity.polygon.hierarchy._value.positions,
                    width: entity.polygon.outlineWidth,
                    material: Cesium.Color.YELLOW,
                    clampToGround: true,
                    zIndex: 13-i,
                }
                entity.polygon.zIndex = 13-i;
    
                entity.availability = new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
                    start: trueStart,
                    stop: stop
                })]);
                trueStart = Cesium.JulianDate.addSeconds(trueStart, 3600, new Cesium.JulianDate());
            }
        })
    } else {
        showPromiseData(globalParams.fireByDataSourcePromise, true)
    }
}

export const initFire = () => {
    
    let start = Cesium.JulianDate.now(new Date())
    globalParams.viewer.clock.currentTime = start;

    if(globalParams.fireByDataSourcePromise != undefined) {
        showPromiseData(globalParams.fireByDataSourcePromise, false)
    }

    let wildFireCollen = globalParams.wildFireCollection.length - 1
    let smokeCollen = globalParams.smokeCollection.length - 1

    while (wildFireCollen >= 0) {
        globalParams.viewer.scene.primitives.remove(
            globalParams.wildFireCollection[wildFireCollen--]
        )
    }
    globalParams.wildFireCollection = []

    while (smokeCollen >= 0) {
        globalParams.viewer.scene.primitives.remove(
            globalParams.smokeCollection[smokeCollen--]
        )
    }
    globalParams.smokeCollection = []
    
}

function particleFire(lon, lat) {

    let wildFirePostion = new Cesium.Cartesian3.fromDegrees(lon, lat);
    let eventTime = 320.0;
    let loopEventTime = new Boolean(true);
    let wildFireActiveRadius = 5;
    let wildFireEmission = 30.0;
    let fireStartScale = wildFireActiveRadius / 20;
    let fireEndScale = wildFireActiveRadius / 2;
    let smokeMaxParticalLife = (wildFireActiveRadius / 2) + 10.25;
    let smokeEndScale = (wildFireActiveRadius / 2) + 2.0;
    let smokeDensity = 1.0;
    let wildFireDisplayDistance = (wildFireActiveRadius * 100) + 8000;
    if (wildFireDisplayDistance < 8000) { wildFireDisplayDistance = 8000 };
    let wildFireChange = new Boolean(false);
    let wildFire, smoke;
    globalParams.viewer.camera.changed.addEventListener(function () {
        let cameraDistance = Cesium.Cartesian3.distance(globalParams.viewer.scene.camera.position, wildFirePostion);
        if (cameraDistance < wildFireDisplayDistance && wildFireChange == false) {
            let emitterModelMatrix = new Cesium.Matrix4();
            let translation = new Cesium.Cartesian3();
            let rotation = new Cesium.Quaternion();
            let hpr = new Cesium.HeadingPitchRoll();
            let trs = new Cesium.TranslationRotationScale();
            let wildFireHeading = 0.0;
            let wildFirePitch = -50.0;
            let wildFireRoll = -30.0;                                                                                            
            let wildFiretransX = 0.0;
            let wildFiretransY = 0.0;
            let wildFiretransZ = 2.5;
            let sizeFactor = 1.0;
            let wildfireGravity = 1.0;

            function wildFireApplyGravity(particle, dt) {
                let gravityVector = Cesium.Cartesian3.normalize(particle.position, new Cesium.Cartesian3());
                Cesium.Cartesian3.multiplyByScalar(gravityVector, wildfireGravity * dt, gravityVector);
                particle.velocity = Cesium.Cartesian3.add(particle.velocity, gravityVector, particle.velocity);
                let displayDistance = Cesium.Cartesian3.distance(globalParams.viewer.scene.camera.position, wildFirePostion);
                let newSize = sizeFactor*(wildFireDisplayDistance / displayDistance);
                particle.imageSize = new Cesium.Cartesian2(newSize, newSize);
            };

            function computeEmitterModelMatrix(wildFireHeading, wildFirePitch, wildFireRoll, wildFiretransX, wildFiretransY, wildFiretransZ) {
                hpr = Cesium.HeadingPitchRoll.fromDegrees(wildFireHeading, wildFirePitch, wildFireRoll, hpr);
                trs.translation = Cesium.Cartesian3.fromElements(wildFiretransX, wildFiretransY, wildFiretransZ, translation);
                trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(Cesium.HeadingPitchRoll.fromDegrees(wildFireHeading, wildFirePitch, wildFireRoll), rotation);
                return Cesium.Matrix4.fromTranslationRotationScale(trs, emitterModelMatrix);
            };

            wildFire = new Cesium.ParticleSystem({
                modelMatrix: new Cesium.Matrix4.fromTranslation(wildFirePostion),
                minimumSpeed: 0.1,
                maximumSpeed: 1.0,
                minimumParticleLife: 0.1,
                maximumParticleLife: 1.0,
                lifetime: eventTime,
                loop: loopEventTime,
                emitter: new Cesium.CircleEmitter(wildFireActiveRadius),
                emitterModelMatrix: computeEmitterModelMatrix(wildFireHeading, wildFirePitch, wildFireRoll, wildFiretransX, wildFiretransY, wildFiretransZ),
                startScale: fireStartScale,
                endScale: fireEndScale,
                image: '/src/assets/fire.png',
                emissionRate: wildFireEmission,
                startColor: Cesium.Color.RED.withAlpha(0.6),
                endColor: Cesium.Color.YELLOW.withAlpha(0.1),
                bursts: [
                    new Cesium.ParticleBurst({ time: 1.0, minimum: 10, maximum: 50 }),
                ],
                updateCallback: wildFireApplyGravity,
            });
            globalParams.wildFireCollection.push(wildFire)
            globalParams.viewer.scene.primitives.add(wildFire);

            smoke = new Cesium.ParticleSystem({
                modelMatrix: new Cesium.Matrix4.fromTranslation(wildFirePostion),
                minimumSpeed: 2.0,
                maximumSpeed: 4.0,
                minimumParticleLife: 0.5,
                maximumParticleLife: smokeMaxParticalLife,
                lifetime: eventTime,
                loop: loopEventTime,
                emitter: new Cesium.CircleEmitter(wildFireActiveRadius),
                emitterModelMatrix: computeEmitterModelMatrix(wildFireHeading, wildFirePitch, wildFireRoll, wildFiretransX, wildFiretransY, wildFiretransZ),
                startScale: 0.01,
                endScale: smokeEndScale,
                image: '/src/assets/smoke.png',
                emissionRate: wildFireEmission*smokeDensity,
                startColor: Cesium.Color.GREY.withAlpha(0.2),
                endColor: Cesium.Color.GAINSBORO.withAlpha(0.01),
                bursts: [
                    new Cesium.ParticleBurst({ time: 5.0, minimum: 20, maximum: 80 }),
                ],
                updateCallback: wildFireApplyGravity
            });
            globalParams.smokeCollection.push(smoke)
            globalParams.viewer.scene.primitives.add(smoke);
            wildFireChange = true;
            wildFire.show = true;
            smoke.show = true;
        } else if (cameraDistance > wildFireDisplayDistance && wildFireChange == true) {
            wildFireChange = false;
            wildFire.show = false;
            smoke.show = false;
        }
    });
}

export const addParticleFire = () => {

    globalParams.viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(
            118.1610,27.2343,10000.0
        ),
        orientation: {
            heading: Cesium.Math.toRadians(350),
            pitch: Cesium.Math.toRadians(-50),
            roll: 0.0,
        },
    })
    globalParams.viewer.clock.shouldAnimate = true
    globalParams.viewer.clock.multiplier = 1

    let fireData = [[118.13019423317073,27.30519309694402],[118.13025065382662,27.30477739060308],[118.13030817153879,27.30447000150336],[118.1304768380268,27.304161713653066],[118.13077640377578,27.30380723103091],[118.1311581755385,27.303587490375804],[118.13146994741543,27.303440532663043],[118.13176205908748,27.303347896490507],[118.13206427462622,27.303255177903132],[118.13264150667868,27.30337688314347],[118.13317942250845,27.30360723074463],[118.13364688472163,27.303865229048167],[118.13398299128879,27.304124291246918],[118.13425810552559,27.30434773876435],[118.13440287220098,27.30467154233518],[118.1345088739532,27.30515814938162],[118.13423889642587,27.305440182334582],[118.13398830092979,27.305640813031346],[118.13349537753203,27.305861462660193],[118.13302119454607,27.305937523948888],[118.13278906343785,27.305966486628204],[118.13224469675531,27.306097277027664],[118.1319007729966,27.306063953409396],[118.13156686247706,27.30602152071513],[118.13100964383355,27.305881595095503],[118.13059251875526,27.305605126658936],[118.13038832330719,27.30539915280919],[118.13019423317073,27.30519309694402]]

    for(let i = 0; i < fireData.length; i++){
		particleFire(fireData[i][0], fireData[i][1]);
	}
}

export const elevation = () => {
    
    var elevationConterMaterial = new Cesium.Material({
        fabric: {
            type: 'ElevationRampCounter',
            materials: {
                elevationRampMaterial: {
                    type: "ElevationRamp",
                    uniforms: {
                        //等高线的颜色
                        image: 'color2.png',
                        //等高线的间隔
                        minimumHeight: 0,
                        maximumHeight: 1400,
                    }

                },
                contourMaterial: {
                    type: "ElevationContour",
                    uniforms: {
                        //等高线的颜色
                        color: new Cesium.Color(0.0, 0.0, 1.0, 1.0),
                        //等高线的间隔
                        spacing: 200,
                        width: 2,
                    }

                }
            },
            components: {
                diffuse:
                    "contourMaterial.alpha == 0.0 ? elevationRampMaterial.diffuse : contourMaterial.diffuse",
                alpha:
                    "max(contourMaterial.alpha, elevationRampMaterial.alpha)",
            },
            translucent: false,
        }
    });

    globalParams.viewer.scene.globe.material = elevationConterMaterial;
}