import ElSelect from 'element-plus/es/components/select';
import type { Ref } from 'vue';
import type ElTree from 'element-plus/es/components/tree';
export declare const useSelect: (props: any, { attrs }: {
    attrs: any;
}, { tree, key, }: {
    select: Ref<InstanceType<typeof ElSelect> | undefined>;
    tree: Ref<InstanceType<typeof ElTree> | undefined>;
    key: Ref<string>;
}) => any;
