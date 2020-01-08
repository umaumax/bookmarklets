javascript: ;

var get_refs_change = function() {
    /* e.g. https://xxx.co.jp/changes/12345/revisions/3/patch?download */
    var url = document.querySelector("a#download").href;
    var regex = /\/changes\/([0-9]+)\/revisions\/([0-9]+)/g;
    var ret = regex.exec(url);
    if (ret != null) {
        var id = ret[1];
        var last_two_id_nums = id.substr(id.length - 2);
        var revisions = ret[2];
        return "refs/changes/" + last_two_id_nums + "/" + id + "/" + revisions;
    }
    return null;
};

var copy_to_clipboard = function() {
    var copy_area = document.createElement("textarea");
    copy_area.textContent = get_refs_change();

    document.body.appendChild(copy_area);
    copy_area.select();

    var ret_val = document.execCommand('copy');
    document.body.removeChild(copy_area);
    return ret_val;
};

copy_to_clipboard();
