(function(Modulr){

    // check if instance already instantiated
    if (Modulr.getInstance('${uid}')) { return false; }

    var Instance = Modulr.config({
        // unique instance identifier
        instance: "${uid}",
        // base domain url
        baseDomain: ${baseDomain},
        // base pathname
        baseUrl: "${baseUrl}",
        // master file
        masterFile: "${masterFile}",
        // other package paths
        packages: {

        },
        shim: {

        }
    });

    Instance.require(['main']);

}(window.Modulr));
