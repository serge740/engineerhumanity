export declare class UpdateSiteDto {
    name?: string;
    domain?: string;
    metadata?: {
        title?: string;
        description?: string;
        favicon?: string;
    };
    globalCSS?: string;
    globalJS?: string;
    published?: boolean;
}
